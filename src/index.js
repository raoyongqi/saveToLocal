const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,  // 禁用 Node.js 集成
            contextIsolation: true,  // 启用上下文隔离
            preload: path.join(__dirname, 'preload.js')  // 指定 preload.js 文件
        }
    });

    // 加载前端页面
    win.loadFile('src/index.html');
}

// 启动时创建窗口
app.whenReady().then(createWindow);

// 监听文件保存请求
ipcMain.handle('save-file', (event, content) => {
    const userRoamingPath = path.join(os.homedir(), 'AppData', 'Roaming', 'recipe-saver');  // 指定保存路径
    const filePath = path.join(userRoamingPath, 'saved.txt');  // 设置保存文件名为 saved.txt

    // 确保目标文件夹存在
    if (!fs.existsSync(userRoamingPath)) {
        fs.mkdirSync(userRoamingPath, { recursive: true });
    }

    // 使用 fs 模块将文本内容写入文件
    fs.writeFileSync(filePath, content, 'utf8');
    return `文件已保存到：${filePath}`;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
