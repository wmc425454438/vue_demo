var blueBubble = document.getElementsByClassName("blueBubble");
var redBall = document.getElementById("red");
var div_width = document.getElementById('container').offsetWidth;
var div_height = document.getElementById('container').offsetHeight;
var container = document.getElementById('container');
window.onload=Main;

//生成蓝色气泡
function createBubble(num){
	var div = document.getElementById('container'); 
	for(var i = 0; i< num; i++){
		var img = document.createElement('img');
		//气泡的直径在30~100之间
        var bubbleSize = Math.random()*(100-30)+30;
		img.src = "./blue.png";
        img.width = bubbleSize;
		img.height = bubbleSize;
		img.className = 'blueBubble';
		var top=Math.random()*div_width;
		var left=Math.random()*div_height;
		img.setAttribute('style','top:'+top+'px;'+'left:'+left+'px;'+'position:absolute;');
		div.appendChild(img);
	}
}


//判断鼠标移动事件
function GetMouse(oEvent)
{
 var x=oEvent.clientX;
 var y=oEvent.clientY;
 var borderx = x - container.offsetLeft ;
 var bordery = y - container.offsetTop ;

 //限定红气泡边缘
 if(borderx-redBall.width/2 > 0 && borderx+redBall.width/2 <  container.offsetWidth) {
     document.getElementById("red").style.left = (parseInt(x) - container.offsetLeft - 50) + "px";
 }else
     document.getElementById("red").style.left = borderx;

 if(bordery-redBall.width/2 > 0 && bordery+redBall.width/2 <  container.offsetHeight) {
	document.getElementById("red").style.top = (parseInt(y) - container.offsetTop - 50) + "px";
 }else
	document.getElementById("red").style.top = bordery;

 //遍历蓝色气泡，查看是否在红色气泡周围
 for (var i = blueBubble.length - 1; i >= 0; i--) {
 	blueBoom(i);
 }
}


//蓝色气泡与红色气泡的距离计算,若在范围内则气泡滚动
function blueBoom(i){


	//获取篮球中心点位置
	var blueX = blueBubble[i].offsetLeft+blueBubble[i].offsetWidth/2;
	var blueY = blueBubble[i].offsetTop+blueBubble[i].offsetWidth/2;

	//获取红球中心点位置
	var redX = redBall.offsetLeft+redBall.offsetWidth/2;
	var redY = redBall.offsetTop+redBall.offsetWidth/2;

	var x = Math.floor(Math.abs(blueX - redX));
	var y = Math.floor(Math.abs(blueY - redY));

	//两个气泡之间的距离
	var distance = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));

	//气泡距离小于半径之和，则发生碰撞
	if(distance < redBall.offsetWidth/2+blueBubble[i].offsetWidth/2){

        //计算两球之间的撞击角度
        var sinx = Math.abs((redY - blueY) / (redX - blueX));
        var cosx = Math.abs((redX - blueX) / (redY - blueY));

        if(redY - blueY>0 && redX - blueX>0)
		{
            blueBubble[i].style.top = blueBubble[i].offsetTop - 150  + "px";
            blueBubble[i].style.left = blueBubble[i].offsetLeft - 150  + "px";
		}else if(redY - blueY<0 && redX - blueX>0) {
            blueBubble[i].style.top = blueBubble[i].offsetTop + 150 * sinx + "px";
            blueBubble[i].style.left = blueBubble[i].offsetLeft - 150 * cosx + "px";
        }
		else if(redY - blueY>0 && redX - blueX<0){
            blueBubble[i].style.top = blueBubble[i].offsetTop - 150 * sinx + "px";
            blueBubble[i].style.left = blueBubble[i].offsetLeft + 150 * cosx + "px";
		}else
		{
            blueBubble[i].style.top = blueBubble[i].offsetTop + 150 * sinx + "px";
            blueBubble[i].style.left = blueBubble[i].offsetLeft + 150 * cosx + "px";
		}

	}
}

//鼠标移动事件监听
function Main()
{
    var ele=document.getElementById("container");
    ele.onmousemove=function(){GetMouse(event);}
}

createBubble(Math.random()*(30-10)+10);


