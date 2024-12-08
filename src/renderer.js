const textarea = document.getElementById("textarea");

// 保存文件
document.getElementById("save-file").addEventListener("click", async () => {
    const textareaContent = textarea.value;

    try {
        // 向主进程请求保存文件
        const response = await window.electronAPI.saveFile(textareaContent);
        alert(response);  // 提示用户文件保存路径
    } catch (error) {
        console.error('保存文件时发生错误：', error);
        alert('保存文件时发生错误！');
    }
});

// 读取文件
document.getElementById("load-file").addEventListener("click", async () => {
    try {
        // 向主进程请求读取文件内容
        const fileContent = await window.electronAPI.readFile();
        textarea.value = fileContent;  // 显示文件内容在 textarea 中
    } catch (error) {
        console.error('读取文件时发生错误：', error);
        alert('读取文件时发生错误！');
    }
});
