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
	//时钟
	(function(){
		var aI=document.querySelectorAll('#clock .box i');
		function clock(){
			var oDate=new Date();
			var H=oDate.getHours();
			var M=oDate.getMinutes();
			var S=oDate.getSeconds();
			aI[0].style.transform='rotate('+(H%12+M/60)*30+'deg)';
			aI[1].style.transform='rotate('+(M+S/60)*6+'deg)';
			aI[2].style.transform='rotate('+S*6+'deg)';
		}
		clock();
		setInterval(clock,1000);
	})();
	//简单的小钢琴
	(function(){
		var aLi=document.querySelectorAll('#piano .box li');
		for(var i=0;i<aLi.length;i++){
			aLi[i].dataset.index=i;
			aLi[i].addEventListener('mouseenter',function(){
				this.classList.add('active');
				var oAudio=new Audio();
				oAudio.src=oggSound['sound'+(parseInt(this.dataset.index)+49)];
				oAudio.play();
			},false);
			aLi[i].addEventListener('mouseleave',function(){
				this.classList.remove('active');
			},false);
		}
	})();
	
	
	
	
	
	
	
	
	
	
	
	
}
