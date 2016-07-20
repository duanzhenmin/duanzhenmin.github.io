window.onload = function(){
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
	//导航栏时钟
	(function(){
		var aLi=document.querySelectorAll('#home_page time li');
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
					aLi[i].style.transform='rotateX(-90deg)';
					aLi[i].dataset.t=parseInt(aLi[i].innerHTML)
				}
			}
			setTimeout(function(){
				for (var i = 0; i < aLi.length; i++) {
					if(i==2 || i==5)continue;
					aLi[i].style.transform='rotateX(0deg)';
				}
			},200);
		}
		click();
		setInterval(click,1000);
	})();
	//无缝滚动
	(function(){
		var oSlide=document.getElementById("slide");
		var oBox=getByClass(oSlide,'box')[0];
		var oUl=getByClass(oSlide,'ul1')[0];
		var oOl=getByClass(oSlide,'ol1')[0];
		var oPrev=getByClass(oSlide,'prev')[0];
		var oNext=getByClass(oSlide,'next')[0];
		var aLIs=oUl.children;
		var aLi=oOl.children;
		var aI=oOl.getElementsByTagName('i');
		var iNow=0;
		var width=oUl.children[0].offsetWidth;
		//计算总宽度
		oUl.style.width=width*3+'px';
		//改变布局
		for(var i=0;i<aLIs.length;i++){
			aLIs[i].style.position='absolute';
			aLIs[i].style.top='0';
			aLIs[i].style.left=width+'px';
		}
		aLIs[iNow].style.left='0';
		//向右
		oNext.onclick=next;
		function next(){
			move(aLIs[iNow],{left:-width});
			iNow++;
			if(iNow==aLIs.length){
				iNow=0;
			}
			aLIs[iNow].style.left=width+'px';
			move(aLIs[iNow],{left:0},{duration:400});
			tab();
		}
		//向左
		oPrev.onclick=function(){
			move(aLIs[iNow],{left:width});
			iNow--;
			if(iNow==-1){
				iNow=aLIs.length-1;
			}
			aLIs[iNow].style.left=-width+'px';
			move(aLIs[iNow],{left:0},{duration:400});
			tab();
		}
		//指示条
		function tab () {
			for (var i=0;i<aI.length;i++) {
				aLi[i].className='';
			}
			aLi[iNow].className='active';
		}
		//指示条加点击事件
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			aLi[i].onclick=function(){
				if(iNow<this.index){
					aLIs[this.index].style.left=width+'px';
					move(aLIs[iNow],{left:-width});
					move(aLIs[this.index],{left:0},{duration:400});
					iNow=this.index;
					tab();
				}else if(iNow>this.index){
					aLIs[this.index].style.left=-width+'px';
					move(aLIs[iNow],{left:width});
					move(aLIs[this.index],{left:0},{duration:400});
					iNow=this.index;
					tab();
				}
			}
		}
		//自动播放
		var timer;
		function auto(){
			clearInterval(timer);
			timer=setInterval(function(){
				for (var i=0;i<aI.length;i++) {
					aI[i].style.width='0';
				}
				move(aI[iNow],{width:aLi[0].offsetWidth},{duration:3000,complete:next});
			},3500);
		}
		auto();
		//鼠标移入停止、移出运动
		oBox.onmouseenter=function(){
			clearInterval(timer);
			move(aI[iNow],{width:0},{duration:30});
		}
		oBox.onmouseleave=function(){
			auto();
		}
	})();
	
	//照片墙
	(function(){
		var oPhotoWall=document.getElementById('photo_wall');
		var oBox=getByClass(oPhotoWall,'box')[0];
		var oUl=oBox.children[0];
		var aLi=oUl.children;
		var pos=[];
		var tier=999;
		
		var oBtn=getByClass(oPhotoWall,'btn1')[0];
		oBtn.onclick=function(){
			pos.sort(function(n1,n2){
				return Math.random()-0.5;
			});
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],pos[aLi[i].index]);
			}
		}
		//获取Li的位置
		for(var i=0;i<aLi.length;i++){
			pos[i]={
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			};
		}
		//将Li转换为绝对定位
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.left=pos[i].left+'px';
			aLi[i].style.top=pos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin='0';
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			Drag(aLi[i]);
		}
		//拖拽事件
		function Drag(obj){
			obj.onmousedown=function(ev){
				clearInterval(obj.timer);
				obj.style.zIndex=tier++;
				var oEvent=ev || event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvent=ev || event;
					obj.style.left=oEvent.clientX-disX+'px';
					obj.style.top=oEvent.clientY-disY+'px';
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].className='';
					}
					if(findNearest(obj)!=-1){
						aLi[findNearest(obj)].className='active';
					}
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					var bOk=findNearest(obj);
					if (bOk!=-1) {
						aLi[bOk].className='';
						move(obj,pos[aLi[bOk].index]);
						move(aLi[bOk],pos[obj.index]);
						var tmp=obj.index;
						obj.index=aLi[bOk].index;
						aLi[bOk].index=tmp;
					} else{
						move(obj,pos[obj.index]);
					}
				}
				return false;
			}
		}
		//碰撞检测
		function collTest(obj,obj2){
			var l1=obj.offsetLeft;
			var r1=obj.offsetWidth+l1;
			var t1=obj.offsetTop;
			var b1=obj.offsetHeight+t1;
			var l2=obj2.offsetLeft;
			var r2=obj2.offsetWidth+l2;
			var t2=obj2.offsetTop;
			var b2=obj2.offsetHeight+t2;
			if(r1<l2 || b1<t2 || l1>r2 || t1>b2){
				return false;
			}else{
				return true;
			}
		}
		//物体之间的距离
		function getDis(obj,obj2){
			var left1=obj.offsetWidth/2+obj.offsetLeft;
			var top1=obj.offsetHeight/2+obj.offsetTop;
			var left2=obj2.offsetWidth/2+obj2.offsetLeft;
			var top2=obj2.offsetHeight/2+obj2.offsetTop;
			return Math.sqrt((left2-left1)*(left2-left1)+(top2-top1)*(top2-top1));
		}
		//查找最近元素
		function findNearest(obj){
			var iMin=9999999;
			var Zindex=-1;
			for(var i=0;i<aLi.length;i++){
				if(obj==aLi[i])continue;
				if(collTest(obj,aLi[i])){
					if(iMin>getDis(obj,aLi[i])){
						iMin=getDis(obj,aLi[i]);
						Zindex=i;
					};
				}
			}
			return Zindex;
		}
	})();
	
	//放大镜
	(function(){
		var oMagnifier=document.getElementById("magnifier");
		var oSmall=getByClass(oMagnifier,'small')[0];
		var oImg0=oSmall.children[0];
		var oBig=getByClass(oMagnifier,'big')[0];
		var oSpan=oSmall.children[1];
		var oImg=oBig.children[0];
		//鼠标移入
		oSmall.onmouseenter=function(){
			//鼠标移动
			oSmall.onmousemove=function(ev){
				var oEvent=ev || event;
				var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
				var l=oEvent.clientX-oSpan.offsetWidth/2-getPos(oSpan.parentNode).left+scrollLeft;
				var t=oEvent.clientY-oSpan.offsetHeight/2-getPos(oSpan.parentNode).top+scrollTop;
				if(l<=0)l=0;
				if(l>=oSmall.offsetWidth-oSpan.offsetWidth)l=oSmall.offsetWidth-oSpan.offsetWidth;
				if(t<=0)t=0;
				if(t>=oSmall.offsetHeight-oSpan.offsetHeight)t=oSmall.offsetHeight-oSpan.offsetHeight;
				oSpan.style.top=t+'px';
				oSpan.style.left=l+'px';
				//大图位置
				var l1=-(oImg.offsetWidth-oBig.offsetWidth)/(oSmall.offsetWidth-oSpan.offsetWidth)*l;
				var t1=-(oImg.offsetHeight-oBig.offsetHeight)/(oSmall.offsetHeight-oSpan.offsetHeight)*t;
				oImg.style.left=l1+'px';
				oImg.style.top=t1+'px';
			}
			oSpan.style.display='block';
			oBig.style.display='block';
		}
		//鼠标移除
		oSmall.onmouseleave=function(){
			oSpan.style.display='none';
			oBig.style.display='none';
		}
		//更换图片
		var oNav=getByClass(oMagnifier,'nav')[0];;
		var aImgNav=oNav.children;
		aImgNav[0].style.border='2px solid #22c3aa';
		for(var i=0;i<aImgNav.length;i++){
			(function(index){
				aImgNav[i].onmouseenter=function(){
					aImgNav[0].style.border='none';
					aImgNav[1].style.border='none';
					this.style.border='2px solid #22c3aa';
					if(index){
						oImg0.src='img/3/1-1.jpg';
						oImg.src='img/3/2-2.jpg';
					}else{
						oImg0.src='img/3/1.jpg';
						oImg.src='img/3/2.jpg';
					}
				}
			})(i);
		}
	})();

	//图片收放
	(function(){
		var oShrink=document.getElementById("shrink");
		var oBtn=getByClass(oShrink,'btn1')[0];
		var oBox=getByClass(oShrink,'box')[0];
		var aLi=oBox.getElementsByTagName("li");
		//布局转换
		var arr=[];
		for(var i=0;i<aLi.length;i++){
			arr[i]={
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			}
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.position="absolute";
			aLi[i].style.left=arr[i].left+'px';
			aLi[i].style.top=arr[i].top+'px';
			aLi[i].style.margin='0';
		}
		//按钮点击事件
		var count=0;
		var bOk=false;
		var oBtnLeft=oBtn.offsetLeft;
		var oBtnTop=oBtn.offsetTop;
		oBtn.onclick=function(){
			if(bOk)return;
			bOk=true;
			for (var i = 0; i < aLi.length; i++) {
				(function (i){
					//图片收缩
					setTimeout(function (){
						move(aLi[i],{width:0,opacity:0,left:oBtnLeft+20,top:oBtnTop},{complete:function(){
							if(i==aLi.length-1){
								//图片展开
								for (var j = 0; j < aLi.length; j++) {
									(function (j){
										setTimeout(function (){
											move(aLi[j],{width:150,opacity:1,left:arr[j].left,top:arr[j].top},{complete:function(){
												//按钮可用
												if(j==aLi.length-1)bOk=false;
											}});
										},j*200);
									})(j);
								}
							}
						}})
					},i*200);
				})(i);
			}
		}
		//拉钩效果
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseenter=function(ev){
				var oEvent=ev || event;
				var a=hoverDir(this,oEvent);
				var oP=this.children[1];
				switch(a){
					case 0:
						oP.style.left='150px';
						oP.style.top='0';
						break;
					case 1:
						oP.style.left='0';
						oP.style.top='150px';
						break;
					case 2:
						oP.style.left='-150px';
						oP.style.top='0';
						break;
					case 3:
						oP.style.left='0';
						oP.style.top='-150px';
						break;
				}
				move(oP,{left:0,top:0});
			}
			aLi[i].onmouseleave=function(ev){
				var oEvent=ev || event;
				var a=hoverDir(this,oEvent);
				var oP=this.children[1];
				switch(a){
					case 0:
						move(oP,{left:150,top:0});
						break;
					case 1:
						move(oP,{left:0,top:150});
						break;
					case 2:
						move(oP,{left:-150,top:0});
						break;
					case 3:
						move(oP,{left:0,top:-150});
						break;
				}
			}
		}
	})();
	
	//手风琴
	(function(){
		var oAccordion=document.getElementById("accordion");
		var oUl=oAccordion.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var w=30;
		oUl.style.width=aLi[0].offsetWidth+(aLi.length-1)*30+'px';
		for (var i = 1; i < aLi.length; i++) {
			aLi[i].style.left=aLi[0].offsetWidth+(i-1)*w+'px';
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			aLi[i].onmouseenter=function(){
				for (var i = 1; i < aLi.length; i++) {
					if (i<=this.index) {
						move(aLi[i],{left:i*w});
					} else{
						move(aLi[i],{left:aLi[0].offsetWidth+(i-1)*w});
					}
				}
			}
		}
	})();

	//分步运动
	(function(){
		var oStep=document.getElementById("step");
		var oBox=getByClass(oStep,'box')[0];
		var oBtn=getByClass(oStep,'btn')[0];
		var C=8;
		var R=12;
		var iWidth=parseFloat(getStyle(oBox,'width'))/R;
		var iHeight=parseFloat(getStyle(oBox,'height'))/C;
		var iNow=0;
		for (var i=0;i<C;i++) {
			for (var j = 0; j < R; j++) {
				var oI=document.createElement('i');
				oI.style.position='absolute';
				oI.style.left=j*iWidth+'px';
				oI.style.top=i*iHeight+'px';
				oI.style.width=iWidth+'px';
				oI.style.height=iHeight+'px';
				oI.style.backgroundPosition=(-j*iWidth)+'px '+(-i*iHeight)+'px';
				oI.c=i;
				oI.r=j;
				oBox.appendChild(oI);
			}
		}
		var aI=oBox.children;
		var bOk=false;
		oBtn.onclick=function(){
			if(bOk)return;
			bOk=true;
			var icount=0;	
			for (var i = 0; i < aI.length; i++) {
				(function(index){
					setTimeout(function(){
						aI[index].style.opacity='0';
						move(aI[index],{opacity:1});
						aI[index].style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
						icount++;
						if(icount==aI.length){
							iNow++;
							iNow=iNow%3;
							oBox.style.background='url(img/'+iNow+'.jpg)';
							bOk=false;
						}
					},(aI[index].c+aI[index].r)*80);
				})(i);
			}
		}
	})();
	
	//3D轮播图
	(function(){
		var oTab3D=document.getElementById("tab_3D");
		var aBtn=getByClass(oTab3D,'btn')[0].children;
		var aLi=getByClass(oTab3D,'pic')[0].children;
		var posArr=[
					{left:27,top:45},
					{left:311,top:75},
					{left:593,top:45}
					];
		var posArr1=[
					{width:163,opacity:0.4},
					{width:207,opacity:1},
					{width:163,opacity:0.4}
					];
		var iNow=0;
		//上一个
		function pre(){
			move(aLi[0],posArr[1]);
			move(aLi[0].children[0],posArr1[1]);
			move(aLi[1],posArr[2]);
			move(aLi[1].children[0],posArr1[2]);
			move(aLi[2],posArr[0],{complete:function(){
				var tmp=aLi[0].className;
				aLi[0].className=aLi[1].className;
				aLi[1].className=aLi[2].className;
				aLi[2].className=tmp;
				var tmp1=posArr[0];
				posArr[0]=posArr[1];
				posArr[1]=posArr[2];
				posArr[2]=tmp1;
				var tmp2=posArr1[0];
				posArr1[0]=posArr1[1];
				posArr1[1]=posArr1[2];
				posArr1[2]=tmp2;
				var tmp3=aLi[(iNow+2)%3].onclick;
				aLi[(iNow+2)%3].onclick=aLi[iNow].onclick;
				aLi[iNow].onclick=null;
				aLi[(iNow+1)%3].onclick=tmp3;
				iNow=(iNow+2)%3;
			}});
			move(aLi[2].children[0],posArr1[0]);
		}
		aLi[0].onclick=aBtn[0].onclick=function(){
			pre();
		}
		//下一个
		function next(){
			move(aLi[0],posArr[2]);
			move(aLi[0].children[0],posArr1[2]);
			move(aLi[1],posArr[0]);
			move(aLi[1].children[0],posArr1[0]);
			move(aLi[2],posArr[1],{complete:function(){
				var tmp=aLi[0].className;
				aLi[0].className=aLi[2].className;
				aLi[2].className=aLi[1].className;
				aLi[1].className=tmp;
				var tmp1=posArr[0];
				posArr[0]=posArr[2];
				posArr[2]=posArr[1];
				posArr[1]=tmp1;
				var tmp2=posArr1[0];
				posArr1[0]=posArr1[2];
				posArr1[2]=posArr1[1];
				posArr1[1]=tmp2;
				var tmp3=aLi[iNow%3].onclick;
				aLi[iNow%3].onclick=aLi[(iNow+2)%3].onclick;
				aLi[(iNow+2)%3].onclick=null;
				aLi[(iNow+1)%3].onclick=tmp3;
				iNow=(iNow+1)%3;
			}});
			move(aLi[2].children[0],posArr1[1]);
		}
		aLi[2].onclick=aBtn[1].onclick=function(){
			next();
		}	
	})();
	
	//苹果桌面
	(function(){
		var oMac=document.getElementById("mac");
		var aImg=oMac.getElementsByTagName('img');
		var width=parseFloat(getStyle(aImg[1],'width'));
		oMac.onmousemove=function(ev){
			var H=document.documentElement.scrollTop || document.body.scrollTop;
			var oEvent=ev || event;
			var posX=oEvent.clientX;
			var posY=oEvent.clientY;
			
			for(var i=1;i<aImg.length;i++){
				var a=posX-aImg[i].offsetWidth/2-getPos(aImg[i]).left;
				var b=posY-aImg[i].offsetHeight/2-getPos(aImg[i]).top+H;
				var c=Math.sqrt(a*a+b*b);
				var per=1-c/350;
				if(per<=0.5){
					aImg[i].style.width=width+'px';
				}else{
					aImg[i].style.width=2*width*per+'px';
				}
			}
		}
	})();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}