window.onload=function(){
	function setRem() {
	    var screenWidth = window.innerWidth;
	    document.documentElement.style.fontSize = (100 * screenWidth / 1242) + 'px';
	}

	setRem();

}