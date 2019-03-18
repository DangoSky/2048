var val = new Array();
var add = new Array();
var score = 0;
var startX = 0;
var startY = 0;
var direction = 0;

$(document).ready(function(e){
	init();             
});

function init(){
	score = 0;
	changeScore();
	changeBestScore();
	for(var i=0; i<4; i++){
		val[i] = new Array();
		add[i] = new Array();
		for(var j=0; j<4; j++){
			val[i][j] = 0;
			add[i][j] = 0;
			$("#grid_cell_" + i + "_" + j).css("top", getTop(i));
			$("#grid_cell_" + i + "_" + j).css("left", getLeft(j));
		}
	}
	var over= $("#over");     // 隐藏游戏结束面板
	over.css("opacity", "0");
	over.css("display", "none");
	$(".number_cell, .grid_cell").css("opacity", "1");
	generateNumberCell();   // 布局numberCell格子
	generateNumber();       // 随机选择一个位置并获取随机数
	generateNumber(); 
	let content = document.getElementById('content');
	// 添加滑动监听事件
	content.addEventListener('touchstart', function(e) {
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY; 
	})
	content.addEventListener('touchmove', function(e) {
		let endX = e.touches[0].pageX;
		let endY = e.touches[0].pageY;
		let dx = endX - startX;
		let dy = endY - startY;
		// 按四个象限求出开始结束两个点所成线段的角度
		let angle = -Math.atan2(dy, dx) * 180 / Math.PI;
		direction = judgeDirection(angle);
		// 设置passive为false来提前告知浏览器使用preventDefault阻止默认行为
		e.preventDefault();
	}, {passive: false})
	content.addEventListener('touchend', function() {
		if(direction !== 0) {
			move(direction);
		}
		
	})
}

function generateNumberCell(){
	$(".number_cell").remove();
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
		    $(".content").append('<div class="number_cell" id="number_cell_' + i + '_' + j + '"></div>');		
			var numberCell= $("#number_cell_" + i + "_" + j);	
			if(val[i][j] == 0) {
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
			}
			else{
				numberCell.css("width", "21.25%;");
				numberCell.css("height", "21.25%;");
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
$(document).keydown(function(event) {
	move(event.keyCode);
})

function move(key) {
	switch(key) {
		case 37:
		case 4:    
		    if(moveLeft()){
				generateNumber();
			}  
			break;
		case 39:
		case 2:
		    if(moveRight()){
				generateNumber();
			}
			break;
		case 38:
		case 1:
		    if(moveUp()){
				generateNumber();
			}
			break;
		case 40:
		case 3:
		    if(moveDown()){
				generateNumber();
			}
			break;		
	}
	changeScore();
    setTimeout("isGameOver()",400);	
}

//实时改变分数
function changeScore(){
	$("#score").html(score);
	changeBestScore();
}

// 实时改变最高分数
function changeBestScore(){
	let tem = localStorage.getItem('2048_bestScore') || 0;
	if(score > tem) {
		tem = score;
		localStorage.setItem('2048_bestScore', score);
	}
	 $('#bestScore').html(tem);
}
  
// 判断是往哪个方向的移动
function judgeDirection(angle) {
    if (angle >= 45 && angle <= 135) {
      return 1;
    } else if (angle < 45 && angle >= -45) {
      return 2;
    } else if (angle < -45 && angle >= -135) {
      return 3;
    } else if ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180)) {
      return 4;
    } else {
      return 0;
    }
}