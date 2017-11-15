var blueBall = document.getElementsByClassName("blueBall");
var container = document.getElementsByClassName("container");
var redBall = document.getElementsByClassName("redBall")[0];
var div_width = document.getElementById('container').offsetWidth;
var div_height = document.getElementById('container').offsetHeight;
//console.log(document.getElementById('container').offsetWidth);

var blueimg = document.createElement("img");
blueimg.setAttribute("src","./blue.png");
blueimg.setAttribute("class","blueBall");


var ballNum = Math.ceil(Math.random() * 8 + 8);

for (var i = ballNum - 1; i >= 0; i--) {
	let oi = blueimg.cloneNode(true);
	container[0].appendChild(oi);
}


for (var i = 0; i < blueBall.length; i++) {
	let ballSize = hwsize();
	blueBall[i].style.width = ballSize + "px";
	blueBall[i].style.height = ballSize + "px";
}


for (var i = 0; i < blueBall.length; i++) {
	blueBall[i].style.top = Math.ceil(Math.random() * div_height) + "px";
	blueBall[i].style.left = Math.ceil(Math.random() * div_width) + "px";
}




function hwsize() {                             
	return Math.ceil(Math.random() * 50) + 50;
}




container[0].addEventListener("mousemove",function(e){
	var redYX = redPositionX(e);
	redBall.style.left =redYX.x  + "px";
	redBall.style.top = redYX.y + "px";
	for (let i = blueBall.length - 1; i >= 0; i--) {
	console.log(i)
		blueBoom(i);
    }
});

function redPositionX(e) {
	var redXY = {
	x: 0,
	y: 0	
	};
	var ok = e.clientX - container[0].offsetLeft - redBall.width/2;
	var yes = e.clientY - container[0].offsetTop - redBall.height/2;

	if(ok < 0){
		redXY.x = 0;
	}else{
		if(ok > (div_width - redBall.width)){
			redXY.x = div_width - redBall.width;
		}else{
			redXY.x = ok;
		}
	}
	if(yes < 0){
		redXY.y = 0;
	}else{
		if(yes > (div_height - redBall.height)){
			redXY.y = div_height - redBall.height;
		}else{
			redXY.y = yes;
		}
	}
	return redXY;
}

function blueBoom(i){



	var blueX = blueBall[i].offsetLeft;
	var blueY = blueBall[i].offsetTop;


	var redX = redBall.offsetLeft;
	var redY = redBall.offsetTop;

	sizeX = redX - blueX;
	sizeY = redY - blueY;

	if(sizeX < 0){
		var absX = Math.abs(sizeX);
		if(absX < redBall.width){
			if(sizeY < 0 ){
				var absY = Math.abs(sizeY);
				if(absY < redBall.width){
					//code С���ƶ�
					blueBall[i].style.top = 50 + "px";
					blueBall[i].style.left = 50 + "px";
				}
				return;
			}else{
				if(absY < blueBall[i].width){

				}
				return;
			}	
		}
		return;
	}else{
		if(absX < blueBall[i].width){
			if(sizeY < 0 ){
				var absY = Math.abs(sizeY);
				if(absY < redBall.width){
					//code С���ƶ�
				}
				return;
			}else{
				if(absY < blueBall[i].width){
					//code С���ƶ�
				}
				return;
			}
		}
		return;
	}

}