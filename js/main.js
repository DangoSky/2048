



var val= new Array();



$(document).ready(function(e){
	
	
	init();              //初始化每一个格子
	generateNumber();    //随机选择一个位置并获取随机数
	generateNumber(); 

});



function init(){
	for(var i=0; i<4; i++){
		val[i]= new Array();
		for(var j=0; j<4; j++){
			val[i][j]= 0;
		}
	}
}


function generateNumber(){
	if(noSpace())  return false;   //判断是否还有空格子
	var randomX= parseInt(Math.floor(Math.random() * 4));
	var randomY= parseInt(Math.floor(Math.random() * 4));
	while(true){
	    if(val[randomX][randomY]== 0)  break;
		else {
			randomX= _.random(0, 3);
	        randomY= _.random(0, 3);
		}
	}
	var randomNumber= (Math.random() < 0.5) ? 2 : 4;
	val[randomX][randomY]= randomNumber;
	showNumberWithAnimation(randomX, randomY, randomNumber);   //布局
	return true;
}



//数字颜色
function getNumberColor(number){
	if(number < 4)  return "#77e65";
	else  return "white";
}


//判断是否还有空格子
function noSpace(){
	for(var i=0 ;i<4; i++){
		for(var j=0; j<4; j++){
			if(val[i][j]== 0)  return false;
		}
	}
	return true;
}


