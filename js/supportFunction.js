//逐渐显示随机数字
function showNumberWithAnimation(i, j, number){
	var numberCell= $("#number_cell_" + i + "_" + j);	
	numberCell.css("background-color", getNumberCellColor(number));
	numberCell.css("color", getNumberColor(number));
	numberCell.text(number);
	numberCell.animate({
		width: "21.25%",
		height: "21.25%",
		top: getTop(i),
		left: getLeft(j),
	}, 100);
}

//数字方格移动动画
function showMoveWithAnimation(fromRow, toRow, fromCol, toCol){
	var numberCell= $("#number_cell_" + fromRow + "_" + fromCol);
	numberCell.animate({
		left: getLeft(toCol),
		top: getTop(toRow),
	}, 100);
}

//数字方格的背景颜色
function getNumberCellColor(number){
	switch(number){
		case 2: 
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

//数字颜色
function getNumberColor(number){
	if(number <=4)  return "#776e65";
	return "white";
}

//numberCell离顶部的距离
function getTop(i){
	return  `${3 + 24.25 * i}%`;
}

//numberCell离左边的距离
function getLeft(j){
	return  `${3 + 24.25 * j}%`;
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

//判断是否还有可以移动的盒子
function noMove(){
	if(canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) return false;
	return true;
}

//判断是否游戏结束
function isGameOver(){
	if(noSpace() && noMove()) gameOver();
}

//游戏结束
function gameOver(){
	$("#body").css("opacity", "0.5");
	var over= $("#over");     
	over.css("display", "block");	
	over.animate({
		"opacity": "1"
	}, 500);
	// 需要移除将之前的监听事件，否则重新开始游戏后会造成监听事件的重叠多次触发
	var content = document.getElementById('content');
	content.removeEventListener('touchstart', touchStart);
	content.removeEventListener('touchmove', touchMove, {passive: false});
	content.removeEventListener('touchend', touchEnd);
	document.removeEventListener('keydown',pressKeyBoard);
}

//向左移动
function moveLeft(){
	if(!canMoveLeft())  return false;
	initAdd();                                     //将判断是否要合并的add数组重置为0
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(val[i][j] != 0 ){
				for(var t=0; t<j; t++){
					if(val[i][t] == 0 && noBlockHorizontal(i, t, j)){     //到达位置为空而且中间没有障碍物
						showMoveWithAnimation(i, i, j, t);                //第i行到第i行，第j列到第t列
					    val[i][t]= val[i][j];
						val[i][j]= 0;
						break;
					}
					else if(val[i][t] == val[i][j] && noBlockHorizontal(i, t, j)){  
						if(add[i][t] == 0){                               //可以和到达位置的方格合并
							showMoveWithAnimation(i, i, j, t);
							val[i][t]+= val[i][j];
							score+= val[i][t];
						    val[i][j]= 0;
							add[i][t]= 1;
						}
						else{                   //到达位置的方格已经被合并过，退而占据右边的方格
							showMoveWithAnimation(i, i, j, t+1);
							val[i][t+1]= val[i][j];
							val[i][j]= 0;
						}
						break;
					}
				}
			}
		}
	}
	return true;
}

//向右移动
function moveRight(){
	if(!canMoveRight())  return false;
	initAdd();
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(val[i][j] != 0 ){
				for(var t=3; t>j; t--){
					if(val[i][t] == 0 && noBlockHorizontal(i, j, t)){     
						showMoveWithAnimation(i, i, j, t);                
					    val[i][t]= val[i][j];
						val[i][j]= 0;
						break;
					}
					else if(val[i][t] == val[i][j] && noBlockHorizontal(i, j, t)){  
						if(add[i][t] == 0){                              
							showMoveWithAnimation(i, i, j, t);
							val[i][t]+= val[i][j];
							score+= val[i][t];
						    val[i][j]= 0;
							add[i][t]= 1;
						}
						else{                   
							showMoveWithAnimation(i, i, j, t-1);
							val[i][t-1]= val[i][j];
							val[i][j]= 0;
						}
						break;
					}
				}
			}
		}
	}
	return true;
}

//向上移动
function moveUp(){
	if(!canMoveUp())  return false;
	initAdd();
	for(var j=0; j<4; j++){
		for(var i=1; i<4; i++){
			if(val[i][j] != 0 ){
				for(var t=0; t<i; t++){
					if(val[t][j] == 0 && noBlockVertical(j, t, i)){     
						showMoveWithAnimation(i, t, j, j);               
					    val[t][j]= val[i][j];
						val[i][j]= 0;
						break;
					}
					else if(val[t][j] == val[i][j] && noBlockVertical(j, t, i)){  
						if(add[t][j] == 0){                              
							showMoveWithAnimation(i, t, j, j);
							val[t][j]+= val[i][j];
							score+= val[t][j];
						    val[i][j]= 0;
							add[t][j]= 1;
						}
						else{                   
							showMoveWithAnimation(i, i, j, t+1);
							val[t+1][j]= val[i][j];
							val[i][j]= 0;
						}
						break;
					}
				}
			}
		}
	}
	return true;
}

//向下移动
function moveDown(){
	if(!canMoveDown())  return false;
	initAdd();
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if(val[i][j] != 0 ){
				for(var t=3; t>i; t--){
					if(val[t][j] == 0 && noBlockVertical(j, i, t)){     
						showMoveWithAnimation(i, t, j, j);              
					    val[t][j]= val[i][j];
						val[i][j]= 0;
						break;
					}
					else if(val[t][j] == val[i][j] && noBlockVertical(j, i, t)){  
						if(add[t][j] == 0){                               
							showMoveWithAnimation(i, t, j, j);
							val[t][j]+= val[i][j];
							score+= val[t][j];
						    val[i][j]= 0;
							add[t][j]= 1;
						}
						else{                   
							showMoveWithAnimation(i, i, j, t-1);
							val[t-1][j]= val[i][j];
							val[i][j]= 0;
						}
						break;
					}
				}
			}
		}
	}
	return true;
}

//恢复判断是否要合并的add数组为初始状态
function initAdd(){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			add[i][j]= 0;
		}
	}
}

//判断格子是否可以向左移动
function canMoveLeft(){
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(val[i][j] != 0){
				if(val[i][j-1] == 0 || val[i][j-1] == val[i][j])  return true;
			}
		}
	}
	return false;
}

//判断格子是否可以向右移动
function canMoveRight(){
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(val[i][j] != 0){
				if(val[i][j+1] == 0 || val[i][j+1] == val[i][j])  return true;
			}
		}
	}
	return false;
}

//判断格子是否可以向上移动
function canMoveUp(){
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			if(val[i][j] != 0){
				if(val[i-1][j] == 0 || val[i-1][j] == val[i][j])  return true;
			}
		}
	}
	return false;
}

//判断格子是否可以向下移动
function canMoveDown(){
	for(var i=2; i>=0; i--){
		for(var j=0; j<4; j++){
			if(val[i][j] != 0){
				if(val[i+1][j] == 0 || val[i+1][j] == val[i][j])  return true;
			}
		}
	}
	return false;
}

//判断水平方向上两个格子之间有没有障碍物
function noBlockHorizontal(row, fromCol, toCol){
	for(var i=fromCol+1; i<toCol; i++){
		if(val[row][i] !=0)  return false;
	}
	return true;
}

//判断竖直方向上两个格子之间有没有障碍物
function noBlockVertical(col, fromRow, toRow){
	for(var i=fromRow+1; i<toRow; i++){
		if(val[i][col] !=0)  return false;
	}
	return true;
}
