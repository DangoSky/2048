
//逐渐显示随机数字
function showNumberWithAnimation(i, j, number){
    var numberCell= $("#cell_" + i + "_" + j);	
	numberCell.css("background-color", getNumberCellColor(number));
	numberCell.css("color", getNumberColor(number));
	numberCell.text(number);
	numberCell.animate({
		width: "100px";
		height: "100px";
		top: getTop(i);
		left: getLeft(j);
	},50);
}


//数字方格的背景颜色
function getNumberCellColor(number){
	switch(number){
		case 2: 
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

//numberCell离顶部的距离
function getTop(i){
	return 7 * (i +1) + 100 * i;
}


//numberCell离左边的距离
function getLeft(j){
	return 7 * (j +1) + 100 * j;
}


