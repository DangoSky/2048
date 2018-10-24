
function $(id){
    return typeof id === "string" ? document.getElementById(id) : null;
}


//获取滚动的头部距离和左边距离
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}


//获取屏幕的宽度和高度
function client() {
    if(window.innerWidth){ // ie9+ 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}


//匀速动画
function constant(obj, target, speed) {
    clearInterval(obj.timer);
    //判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + "px";
        if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 20);
}



//获取对象的css属性值
function getCSS(obj, attr){
	if(obj.currentStyle) {
		return obj.currentStyle[attr];   //IE和opera
	}
	else {
		return window.getComputedStyle(obj, null)[attr];
	}
}


//缓动动画
function animation(obj, json, fn){
	clearInterval(obj.timer);
	var begin= 0, speed= 0,  target= 0;
	obj.timer= setInterval(function(){
		var flag= true;
		//遍历对象
		for(var key in json){
			if(key === "scrollTop"){
				begin= Math.ceil(obj.scrollTop);
				target= parseInt(json[key]);
			}
			else if(key === "opacity"){
			    begin=  parseInt(parseFloat(getCSS(obj, key)) * 100) ;
			    target= parseInt(parseFloat(json[key]) * 100);
			}
			else {
				begin= parseInt(getCSS(obj, key)) || 0;
				target= parseInt(json[key]);	
			}
			
			//步长
			speed= (target - begin) * 0.2;
			
			//向右移动就向上取整，向左移动则向上取整
			speed= (target > begin) ? Math.ceil(speed) : Math.floor(speed);
			if(key === "scrollTop"){
				obj.scrollTop= begin + speed;
			}
			else if(key === "opacity"){
				obj.style.opacity= (begin + speed) / 100;   //遵循w3c的浏览器
				obj.style.filter= 'alpha(opacity:' + (begin + speed) + ')';
			}
			else if(key === "zIndex"){
				obj.style[key]= json[key];
			}
			else {
				obj.style[key]= begin + speed + "px";
			}			
			if(begin !== target){
				flag= false;
			}
		}
			//清除定时器
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}		
			}	
	},20);		
}