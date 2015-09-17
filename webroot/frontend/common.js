// 设置rem字号
function setRem() {
    var screenWidth = window.innerWidth;
    document.documentElement.style.fontSize = (100 * screenWidth / 1242) + 'px';
}

setRem();