const textarea = document.getElementById("textarea");

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
