//首页效果
window.onload=function(){
	var ScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var oHomePage=document.getElementById("home_page");
	var aNavWrap=getByClass(oHomePage,'nav-wrap')[0];
	var oHomeTab=getByClass(oHomePage,'home-tab')[0];
	var aTabLi=oHomeTab.children;
	
	var aHomeTit=getByClass(oHomePage,'home-tit')[0];
	
	var oWork=document.getElementById("work");
	var aWorkChild=oWork.children;
	var aWorkUlLi=aWorkChild[2].getElementsByTagName('li');
	var aWorkSpan=aWorkChild[2].getElementsByTagName('span');
	
	var oAbout=document.getElementById("about");
	var aAboutMe=getByClass(oAbout,'about-me')[0];
	var aAboutMeOl=aAboutMe.getElementsByTagName('ol')[0];
	var aAboutCircletWrap=aAboutMeOl.children;
	var aAboutCirclet=getByClass(aAboutMeOl,'circlet');
	
	var oContact=document.getElementById("contact");
	var aContactP=oContact.getElementsByTagName('p');
	
	var H=0,
		W=0;
	var TabTimer;
	//首页高度
	function size() {
		H=document.documentElement.clientHeight;
		W=document.documentElement.clientWidth;
		oHomePage.style.height=H+'px';
		//轮播图图片高度
		for(var i=0;i<aTabLi.length;i++){
			aTabLi[i].style.height=H+'px';
		}
		
		if(W>=900){
			for (var i = 0; i < aWorkSpan.length; i++) {
				aWorkSpan[i].style.fontSize='45px';
				aWorkUlLi[i].style.width='31%';
			}
			aHomeTit.style.fontSize='31px';
		}else if(W>=600 && W<900){
			for (var i = 0; i < aWorkSpan.length; i++) {
				aWorkSpan[i].style.fontSize='30px';
				aWorkUlLi[i].style.width='31%';
			}
			aHomeTit.style.fontSize='25px';
		}else{
			for (var i = 0; i < aWorkSpan.length; i++) {
				aWorkSpan[i].style.fontSize='45px';
				aWorkUlLi[i].style.width='98%';
			}
			aHomeTit.style.fontSize='20px';
			
			for (var i = 0; i < aAboutCircletWrap.length; i++) {
				aAboutCircletWrap[i].style.width='50%';
			}
		}
		
		aboutMe();
		if(W>=750){
			for (var i = 0; i < aAboutCircletWrap.length; i++) {
				aAboutCircletWrap[i].style.width='25%';
			}
		}else{
			for (var i = 0; i < aAboutCircletWrap.length; i++) {
				aAboutCircletWrap[i].style.width='50%';
			}
		}
	}
	size();
	addEvent(window,'resize',size);

	//导航部分a标签点击效果
	var aNav_A=aNavWrap.getElementsByTagName('a');
	function navActive(){
		for (var i = 0; i < aNav_A.length; i++) {
			aNav_A[i].className='';
		}
		aNav_A[nNavA].className='nav-active';
	}
	var nNavA=0;
	(function(){
		for (var i = 0; i < aNav_A.length; i++) {
			aNav_A[i].index=i;
			addEvent(aNav_A[i],'click',function(){
				nNavA=this.index;
				navActive();
				if(nNavA==0){
					homePage();
				}
				if(nNavA==1){
					workPage();
				}
				if(nNavA==2){
					aboutPage();
				}
				if(nNavA==3){
					contactPage();
				}
			});
		}
	})();

	//点击logo回到首页
	var aH1=oHomePage.getElementsByTagName('h1')[0];
	function homePage(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var timer;
		clearInterval(timer);
		timer=setInterval(function(){
			scrollTop-=100;
			if(scrollTop<0){
				document.documentElement.scrollTop=document.body.scrollTop=0;
				clearInterval(timer);
			}else{
				document.documentElement.scrollTop=document.body.scrollTop=scrollTop;
			}
		},30);
	}
	addEvent(aH1,'click',function(){
		homePage();
		nNavA=0;
		navActive();
	});

	//点击向下箭头换页
	function workPage(){
		var timer;
		var n=ScrollTop;
		clearInterval(timer);
		if(n<=H+30){
			timer=setInterval(function(){
				n+=30;
				if(n<=H+30){
					if(n>H){
						document.body.scrollTop=document.documentElement.scrollTop=H;
					}else{
						document.body.scrollTop=document.documentElement.scrollTop=n;	
					}
				}else{
					clearInterval(timer);
				}
			},30);
		}else{
			timer=setInterval(function(){
				n-=30;
				if(n<=H-30){
					clearInterval(timer);
				}else{
					if(n>H){
						document.body.scrollTop=document.documentElement.scrollTop=n;
					}else{
						document.body.scrollTop=document.documentElement.scrollTop=H;	
					}
				}
			},30);
		}
		
	}
	
	//关于我页面
	function circlet(){
		for(var i=0;i<aAboutCirclet.length;i++){
			var LC=getByClass(aAboutCirclet[i],'l-c')[0];
			var RC=getByClass(aAboutCirclet[i],'r-c')[0];
			var bText=aAboutCirclet[i].getElementsByTagName('b')[0];
			var nDeg=(parseInt(bText.innerHTML)/100-0.5)*180/0.5-45;
			RC.style.transform='rotate(135deg)';
			(function(obj,deg){
				setTimeout(function(){
					obj.style.transform='rotate('+deg+'deg)';
				},500);
			})(LC,nDeg);
		}
	}
	function aboutPage(){
		var timer;
		var n=ScrollTop;
		if(n>H+oWork.offsetHeight+30){
			clearInterval(timer);
			timer=setInterval(function(){
				n-=30;
				if(n<=H+oWork.offsetHeight-30){
					clearInterval(timer);
					document.body.scrollTop=document.documentElement.scrollTop=H+oWork.offsetHeight-40;
					//圆环滑动效果
					circlet();
				}else{
					document.body.scrollTop=document.documentElement.scrollTop=n;	
				}
			},30); 
		}else{
			clearInterval(timer);
			timer=setInterval(function(){
				n+=30;
				if(n<=H+oWork.offsetHeight-30){
					document.body.scrollTop=document.documentElement.scrollTop=n;	
				}else{
					clearInterval(timer);
					document.body.scrollTop=document.documentElement.scrollTop=H+oWork.offsetHeight-40;
					//圆环滑动效果
					circlet();
				}
			},30); 
		}
	}

	//联系我
	function contactPage(){
		var timer;
		var n=ScrollTop;
		clearInterval(timer);
		timer=setInterval(function(){
			n+=50;
			if(n<=H+oWork.offsetHeight+oAbout.offsetHeight-50){
				document.body.scrollTop=document.documentElement.scrollTop=n;	
			}else{
				clearInterval(timer);
				document.body.scrollTop=document.documentElement.scrollTop=H+oWork.offsetHeight+oAbout.offsetHeight-40;
				for (var i = 0; i < aContactP.length; i++) {
					move(aContactP[i],{left:0});
				}
			}
		},30); 
	}
	
	(function(){
		var aNextPage=getByClass(oHomePage,'next-page')[0];
		var aImg=aNextPage.getElementsByTagName('img')[0];
		//箭头浮动效果
		var aImgTop=getStyle(aImg,'top');
		function down(){
			move(aImg,{top:80},{duration:1000,complete:function(){
				move(aImg,{opacity:0},{complete:function(){
					aImg.style.top=aImgTop;
					aImg.style.opacity=1;
					down();
				}});
			}});
		}
		down();
		//箭头点击效果
		addEvent(aNextPage,'click',function(){
			workPage();
			nNavA=1;
			navActive();
		});
	})();
	//首页背景轮播图
	var tabN=0;
	function tab(){
		move(oHomeTab,{top:-H*tabN},{complete:function(){
			tabN++;
			if(tabN>=aTabLi.length){
				oHomeTab.style.top=0;
				tabN=1;
			}
		}});
	}
	//离开首页开启、暂停轮播图
	function tabTime(){
		clearInterval(TabTimer);
		TabTimer=setInterval(function(){
			tab();
		},5000);
	}
	tabTime();
	addEvent(window,'scroll',function(){
		ScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var aNavHidd=getByClass(oHomePage,'nav-hidd')[0];
		if(ScrollTop>=H){
			clearInterval(TabTimer);
		}else{
			tabTime();
		}
		
		//导航部分成固定定位
		if(ScrollTop>=H-80){
			aNavWrap.className='nav-wrap nav-wrap-active';
			move(aNavWrap,{height:80});
			aNavHidd.style.display='block';
			if(ScrollTop<=H+oWork.offsetHeight*2/3){
				nNavA=1;
			}else if(ScrollTop<=H+oWork.offsetHeight){
				nNavA=2;
				circlet();
			}else if(ScrollTop<=H+oWork.offsetHeight+oAbout.offsetHeight){
				nNavA=3;
				for (var i = 0; i < aContactP.length; i++) {
					move(aContactP[i],{left:0});
				}
			}
			navActive();
		}else{
			aNavWrap.className='nav-wrap';
			aNavHidd.style.display='none';
			nNavA=0;
			navActive();
		}
		
		//说明文字展示
		if(ScrollTop>=H-450){
			(function(){
				var aSpan=aWorkIntro.getElementsByTagName('span');
				for (var i = 0; i < aSpan.length; i++) {
					var nSpan=0;
					function show(){
						move(aSpan[nSpan],{opacity:1});
						nSpan++;
					}
					setTimeout(show,50*i);
				}
			})();
		}
	});
	
	//案例相关
	var aWorkIntro=aWorkChild[0].children[1];
	//创建说明文字
	(function(){
		var BWorkOk=false;
		var nAhref=0;
		var strFont='下面所展现的案例均为我在日常工作与学习中所创作的部分作品，这些案例中包含了1HTML2、1CSS2、1JavaScript2和1HTML52、1CSS32以及1Bootstrap2、1JQuery2当中的部分知识点，部分案例以其他网站作为模板所创作、编写，如若涉及版权问题，请您与我联系说明，必将立即更改。';
		for(var i=0;i<strFont.length;i++){
			if(strFont.charAt(i)=='1'){
				nAhref++;
				BWorkOk=true;
				//创建a标签
				var aSpanA=document.createElement('a');
				aSpanA.target='_blank';
				switch(nAhref){
					case 1:
						aSpanA.href='http://www.w3school.com.cn/html/';
						break;
					case 2:
						aSpanA.href='http://www.w3school.com.cn/css/';
						break;
					case 3:
						aSpanA.href='http://www.w3school.com.cn/js/';
						break;
					case 4:
						aSpanA.href='http://www.w3school.com.cn/html5/';
						break;
					case 5:
						aSpanA.href='http://www.w3school.com.cn/css3/';
						break;
					case 6:
						aSpanA.href='http://www.bootcss.com/';
						break;
					case 7:
						aSpanA.href='https://jquery.com/';
						break;
				}
				continue;
			}
			if(BWorkOk){
				if(strFont.charAt(i)=='2'){
					var aSpan=document.createElement('span');
					aSpan.appendChild(aSpanA);
					aWorkIntro.appendChild(aSpan);
					BWorkOk=false;
				}else{
					aSpanA.innerHTML+=strFont.charAt(i);
				}
			}else{
				var aSpan=document.createElement('span');
				aSpan.innerHTML=strFont.charAt(i);
				aWorkIntro.appendChild(aSpan);
			}
		}
	})();
	//************文字展示效果在scroll函数中书写************
	//作品分类划入效果
	(function(){
		var aWorkCon=aWorkChild[2];
		var aWorkLi=aWorkCon.getElementsByTagName('li');
		for (var i = 0; i < aWorkLi.length; i++) {
			addEvent(aWorkLi[i],'mouseenter',function(){
				var aOpacity=this.children[1];
				move(aOpacity,{opacity:1});
			});
			addEvent(aWorkLi[i],'mouseleave',function(){
				var aOpacity=this.children[1];
				move(aOpacity,{opacity:0});
			});
		}
	})();
	
	//***************************关于我*************************
	function aboutMe(){
		(function(){
			var aAboutInf=getByClass(oAbout,'about-inf')[0];
			var aTabWarp=getByClass(aAboutInf,'list-warp')[0];
			var aTab=getByClass(aAboutInf,'list');
			var oBtnUl=getByClass(aAboutInf,'btn')[0];
			var aBtn=oBtnUl.children;
			
			oAbout.style.height=aAboutMe.scrollHeight+'px';
			aAboutInf.style.height=aTab[1].scrollHeight+100+'px';
			//给tab元素设置宽度
			for(var i=0;i<aTab.length;i++){
				aTab[i].style.width=W*0.9+'px';
			}
			//给按钮加marginTop
			oBtnUl.style.marginTop=aTab[0].scrollHeight+15+'px';
			aTabWarp.style.left=-aTab[0].offsetWidth+'px';
			for (var i=0;i<aBtn.length;i++) {
				aBtn[i].index=i;
				addEvent(aBtn[i],'click',function(){
					move(aTabWarp,{left:-this.index*aTab[0].offsetWidth},{easing:'ease-in'});
					for(var j=0;j<aBtn.length;j++){
						aBtn[j].className='';
					}
					this.className='active';
				});
			}
		})();
	}
	aboutMe();
	
	//***************************联系我*************************
	var aContactWebChat=getByClass(oContact,'webchat')[0];
	var aContactWx=getByClass(oContact,'wx')[0];
	var aContactEmail=getByClass(oContact,'email')[0];
	var aContactQq=getByClass(oContact,'qq')[0];
	addEvent(aContactWebChat,'mouseenter',function(){
		move(aContactWx,{width:150});
	});
	addEvent(aContactWebChat,'mouseleave',function(){
		move(aContactWx,{width:0});
	});
	addEvent(aContactEmail,'mouseenter',function(){
		move(aContactQq,{width:150});
	});
	addEvent(aContactEmail,'mouseleave',function(){
		move(aContactQq,{width:0});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
