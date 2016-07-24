window.onload=function(){
	//回到顶部
	(function(){
		var oToTop=document.getElementById("toTop");
		window.onscroll=function(){
			var H=document.documentElement.scrollTop || document.body.scrollTop;
			if(H>200){
				oToTop.style.display='block';
			}else{
				oToTop.style.display='none';
			}
			oToTop.onclick=function(){
				var time;
				clearInterval(time);
				time=setInterval(function(){
					if(H<=0){
						clearInterval(time);
						document.documentElement.scrollTop=document.body.scrollTop=0;
					}else{
						H-=200;
						document.documentElement.scrollTop=document.body.scrollTop=H;
					}
				},30);
			}
		}
	})();
	//导航时钟
	(function(){
		var aLi=document.querySelectorAll('#home_page li');
		function click(){
			var oDate=new Date();
			var H=oDate.getHours();
			var M=oDate.getMinutes();
			var S=oDate.getSeconds();
			aLi[0].innerHTML=Math.floor(H/10);
			aLi[1].innerHTML=H%10;
			aLi[3].innerHTML=Math.floor(M/10);
			aLi[4].innerHTML=M%10;
			aLi[6].innerHTML=Math.floor(S/10);
			aLi[7].innerHTML=S%10;
			for (var i = 0; i < aLi.length; i++) {
				if(i==2 || i==5)continue;
				if(aLi[i].dataset.t!=parseInt(aLi[i].innerHTML)){
					setStyle3(aLi[i],'transform','rotateX(-90deg)');
					aLi[i].dataset.t=parseInt(aLi[i].innerHTML)
				}
			}
			setTimeout(function(){
				for (var i = 0; i < aLi.length; i++) {
					if(i==2 || i==5)continue;
//					aLi[i].style.transform='rotateX(0deg)';
					setStyle3(aLi[i],'transform','rotateX(0deg)');
				}
			},200);
		}
		click();
		setInterval(click,1000);
	})();
	//左右滑动
	(function(){
		var oPre=document.querySelector('#glide .pre');
		var oNext=document.querySelector('#glide .next');
		var aLi=document.querySelectorAll('#glide .ul1 li');
		var arrClass=[];
		for (var i = 0; i < aLi.length; i++) {
			arrClass[i]=aLi[i].className;
		}
		oPre.onclick=function(){
			arrClass.unshift(arrClass.pop());
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className=arrClass[i];
			}
		}
		oNext.onclick=function(){
			arrClass.push(arrClass.shift());
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className=arrClass[i];
			}
		}
	})();
	//多样式更换
	(function(){
		var aInput=document.querySelectorAll('#vary input');
		var aLiWrap=document.querySelectorAll('#vary .box-wrap>li');
		var iShow=0;
		var bFloag=false;
		var iNow=0;
			rNow=1;
		function liShow(iShow){
			for (var i = 0; i < aLiWrap.length; i++) {
				aLiWrap[i].style.display='none';
			}
			aLiWrap[iShow].style.display='block';
		}
		(function(){
			var oBox=document.querySelector('#vary .box1');
			var C=4,R=7;
			var W=oBox.offsetWidth/R;
			var H=oBox.offsetHeight/C;
			var bFloag1=false;
			for (var c = 0; c < C; c++) {
				for (var r = 0; r < R; r++) {
					var oSpan=document.createElement('span');
					oSpan.innerHTML='<i></i><i></i>';
					oSpan.style.width=W+'px';
					oSpan.style.height=H+'px';
					oBox.appendChild(oSpan);
					oSpan.style.left=r*W+'px';
					oSpan.style.top=c*H+'px';
					oSpan.children[0].style.backgroundPosition=-r*W+'px -'+c*H+'px';
					oSpan.children[1].style.backgroundPosition=-r*W+'px -'+c*H+'px';
					oSpan.c=c;
					oSpan.r=r;
				}
			}
			var aSpan=document.querySelectorAll('#vary .box1 span');
			aInput[0].onclick=function(){
				if(bFloag)return false;
				liShow(0);
				for (var i = 0; i < aSpan.length; i++) {
					aSpan[i].children[0].style.backgroundImage='url(img/'+iNow%3+'.jpg)';
					aSpan[i].children[1].style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';;					
				}
				setTimeout(function(){
					bFloag=true;
					iNow++;
					if(iNow>=3)iNow=0;
					rNow++;
					if(rNow>=3)rNow=0;
					for (var i = 0; i < aSpan.length; i++) {
						setStyle3(aSpan[i],'transition','1s all ease '+(aSpan[i].c+aSpan[i].r)*200+'ms');
						setStyle3(aSpan[i],'transform','perspective(800px) rotateY(-180deg)');
					}
					aSpan[aSpan.length-1].addEventListener('transitionend',function(){
						for (var i = 0; i < aSpan.length; i++) {
							setStyle3(aSpan[i],'transition','none');
							setStyle3(aSpan[i],'transform','perspective(800px) rotateY(0deg)');
							aSpan[i].children[0].style.backgroundImage='url(img/'+iNow%3+'.jpg)';
							aSpan[i].children[1].style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';;					
						}
						bFloag=false;
					},false);
				},100);
			}
		})();
		(function(){
			var oBox=document.querySelector('#vary .box2');
			var C=6,R=9;
			var W=oBox.offsetWidth/R;
			var H=oBox.offsetHeight/C;
			for(var c=0;c<C;c++){
				for(var r=0;r<R;r++){
					var oSpan=document.createElement('span');
					oSpan.style.width=W+'px';
					oSpan.style.height=H+'px';
					oSpan.style.left=r*W+'px';
					oSpan.style.top=c*H+'px';
					oSpan.style.background='url(img/0.jpg) no-repeat -'+r*W+'px -'+c*H+'px';
					oBox.appendChild(oSpan);
				}
			}
			var aSpan=document.querySelectorAll('#vary .box2 span');
			aInput[1].onclick=function(){
				if(bFloag)return false;
				liShow(1);
				for (var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.backgroundImage='url(img/'+iNow%3+'.jpg)';
					setStyle3(aSpan[i],'transition','none');
					aSpan[i].style.opacity=1;
				}
				setTimeout(function(){
					bFloag=true;
					iNow++;
					if(iNow>=3)iNow=0;
					rNow++;
					if(rNow>=3)rNow=0;
					oBox.style.backgroundImage='url(img/'+iNow%3+'.jpg)';
					for (var i = 0; i < aSpan.length; i++) {
						var x=(aSpan[i].offsetWidth/2)+aSpan[i].offsetLeft-oBox.offsetWidth/2;
						var y=(aSpan[i].offsetHeight/2) + aSpan[i].offsetTop - oBox.offsetHeight/2;
						setStyle3(aSpan[i],'transition','0.5s all ease-out');
						setStyle3(aSpan[i],'transform','perspective(800px) translateX('+x+'px) translateY('+y+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg) scale(2)');
						aSpan[i].style.opacity=0;
					}
					aSpan[0].addEventListener('transitionend',function(){
						for (var i = 0; i < aSpan.length; i++) {
							aSpan[i].style.backgroundImage='url(img/'+iNow%3+'.jpg)';
							setStyle3(aSpan[i],'transition','none');
							aSpan[i].style.opacity=1;
							setStyle3(aSpan[i],'transform','perspective(800px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)');
						}
						bFloag=false;
					},false);
				},100);
			}
		})();
		(function(){
			var oBox=document.querySelector('#vary .box3');
			var oPage=document.querySelector('#vary .box3 .page');
			var oZheng=oPage.children[0];
			var oFan=oPage.children[1];
			var oPage2=document.querySelector('#vary .box3 .page2')
			aInput[2].onclick=function(){
				if(bFloag)return false;
				liShow(2);
				oBox.style.backgroundImage='url(img/'+iNow%3+'.jpg)';
				oZheng.style.backgroundImage='url(img/'+iNow%3+'.jpg)';
				oFan.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
				oPage2.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
				setTimeout(function(){
					bFloag=true;
					setStyle3(oPage,'transition','1s all ease');
					iNow++;
					if(iNow>=3)iNow=0;
					rNow++;
					if(rNow>=3)rNow=0;
					setStyle3(oPage,'transform','perspective(1000px) rotateY(-180deg)');
					oPage.addEventListener('transitionend',function(){
						setStyle3(oPage,'transition','none');
						setStyle3(oPage,'transform','perspective(1000px) rotateY(0deg)');
						oBox.style.backgroundImage='url(img/'+iNow%3+'.jpg)';
						oZheng.style.backgroundImage='url(img/'+iNow%3+'.jpg)';
						oFan.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
						oPage2.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
						bFloag=false;
					},false);
				},100);
			}
		})();
		(function(){
			var oBox=document.querySelector('#vary .box5');
			var aLi=document.querySelectorAll('#vary .box5 li');
			
			aInput[3].onclick=function(){
				if(bFloag)return false;
				aLi[1].style.backgroundImage='url(img/'+iNow+'.jpg)';
				aLi[2].style.backgroundImage='url(img/'+rNow+'.jpg)';
				liShow(3);
				setTimeout(function(){
					bFloag=true;
					iNow++;
					if(iNow>=3)iNow=0;
					rNow++;
					if(rNow>=3)rNow=0;
					
					setStyle3(oBox,'transition','1s all ease');
					setStyle3(oBox,'transform','rotateY(-90deg)');
					oBox.addEventListener('transitionend',tab,false);
					function tab(){
						setStyle3(oBox,'transition','none');
						setStyle3(oBox,'transform','rotateY(0deg)');
						aLi[1].style.backgroundImage='url(img/'+iNow+'.jpg)';
						aLi[2].style.backgroundImage='url(img/'+rNow+'.jpg)';
						bFloag=false;
					}
				},100);
			}
		})();
		liShow(0);
	})();
	//时钟
	(function(){
		var aI=document.querySelectorAll('#clock .box i');
		function clock(){
			var oDate=new Date();
			var H=oDate.getHours();
			var M=oDate.getMinutes();
			var S=oDate.getSeconds();
			setStyle3(aI[0],'transform','rotate('+(H%12+M/60)*30+'deg)');
			setStyle3(aI[1],'transform','rotate('+(M+S/60)*6+'deg)');
			setStyle3(aI[2],'transform','rotate('+S*6+'deg)');
		}
		clock();
		setInterval(clock,1000);
	})();
	//变幻线
	(function(){
		var oC=document.querySelector('#canvas1');
		var oW=oC.width;
		var oH=oC.height;
		var gd=oC.getContext('2d');
		var nub=5;
		var arrPoint=[];
		var oldLine=[];
		var iLength=12;
		var iN=0;
		var cl='255,255,255'
		var timer;
		//原始数据
		for(var i=0;i<nub;i++){
			arrPoint[i]={
				x:rnd(0,oW),
				y:rnd(0,oH),
				iSpeedX:rnd(-10,10),
				iSpeedY:rnd(-10,10)
			}
		}
		
		clearInterval(timer);
		gd.fillStyle='#fff';
		gd.strokeStyle='#fff';
		timer=setInterval(function(){
			gd.clearRect(0,0,oW,oH);
			//运动的点
			for(var i=0;i<arrPoint.length;i++){
				gd.beginPath();
				arrPoint[i].x+=arrPoint[i].iSpeedX;
				arrPoint[i].y+=arrPoint[i].iSpeedY;
				if(arrPoint[i].x<=0 || arrPoint[i].x>=oW){
					arrPoint[i].iSpeedX*=-1;
				}
				if(arrPoint[i].y<=0 || arrPoint[i].y>=oH){
					arrPoint[i].iSpeedY*=-1;
				}
				gd.fillRect(arrPoint[i].x,arrPoint[i].y,1,1);
			}
			//连接各个点
			gd.beginPath();
			gd.moveTo(arrPoint[0].x,arrPoint[0].y);
			for(var i=1;i<arrPoint.length;i++){
				gd.lineTo(arrPoint[i].x,arrPoint[i].y);
			}
			gd.closePath();
			gd.stroke();
			//保存点
			var oldPoint=[];
			for(var i=0;i<arrPoint.length;i++){
				oldPoint[i]={
					x:arrPoint[i].x,
					y:arrPoint[i].y
				}
			}
			oldLine.push(oldPoint);
			//画旧线
			for(var i=0;i<oldLine.length;i++){
				gd.beginPath();
				iN++;
				if(iN>=iLength/30*2000){
					setTimeout(function(){
						cl=gd.strokeStyle=rnd(0,256)+','+rnd(0,256)+','+rnd(0,256);
					},2000);
					iN=0;
				}
				gd.strokeStyle='rgba('+cl+','+(1-(iLength-i)/iLength)+')';
				gd.moveTo(oldLine[i][0].x,oldLine[i][0].y);
				for(var j=1;j<oldLine[i].length;j++){
					gd.lineTo(oldLine[i][j].x,oldLine[i][j].y)
				}
				gd.closePath();
				gd.stroke();
			}
			if(oldLine.length>iLength){
				oldLine.shift();
			}
		},30);
	})();
	
	
	
	
	
	
	
	
	
	
	
	
}
