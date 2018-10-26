var val = new Array();
var add = new Array();
var score = 0;
$(document).ready(function(e){
	init();              //初始化每一个格子
	generateNumber();    //随机选择一个位置并获取随机数
	generateNumber(); 
	changeScore();
});

function init(){
	for(var i=0; i<4; i++){
		val[i]= new Array();
		add[i]= new Array();
		for(var j=0; j<4; j++){
			val[i][j]= 0;
			add[i][j]= 0;
			$("#grid_cell_" + i + "_" + j).css("top", getTop(i));
			$("#grid_cell_" + i + "_" + j).css("left", getLeft(j));
		}
	}

	generateNumberCell();
}

function generateNumberCell(){
	$(".number_cell").remove();
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
		    $(".container").append('<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>');						
			var numberCell= $("#number_cell_" + i + "_" + j);	
			if(val[i][j] == 0) {
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
			}
			else{
				numberCell.css("width", "100px");
				numberCell.css("height", "100px");
				numberCell.css("background-color", getNumberCellColor(val[i][j]));
	            numberCell.css("color", getNumberColor(val[i][j]));
	            numberCell.text(val[i][j]);
			}  
			numberCell.css("top", getTop(i));
			numberCell.css("left", getLeft(j));
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

//监听键盘
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:    
		    if(moveLeft()){
				generateNumber();
			}  
			break;
		case 39:
		    if(moveRight()){
				generateNumber();
			}
			break;
		case 38:
		    if(moveUp()){
				generateNumber();
			}
			break;
		case 40:
		    if(moveDown()){
				generateNumber();
			}
			break;
	}
	changeScore();
	generateNumber();
    setTimeout("isGameOver()",400);	
})

//实时改变分数
function changeScore(){
	$("#score").innerHTML= score;
	
}