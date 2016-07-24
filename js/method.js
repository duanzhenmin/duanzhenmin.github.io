
//获取非行间样式
function getStyle(obj,name){
	return (obj.cuurentStyle || getComputedStyle(obj,false))[name];
}

//事件绑定
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
//事件解除
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);
	}else{
		obj.datachEvent('on'+sEv,fn);
	}
}

//运动框架
function move(obj,json,options){
	var options=options || {};
	options.duration=options.duration || 500;
	options.easing=options.easing || 'linear';
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var aa=n/count;
					var ss=dis[name]*aa+start[name];
					break;
				case 'ease-in':
					var aa=n/count;
					var ss=dis[name]*aa*aa*aa+start[name];
					break;
				case 'ease-out':
					var aa=1-n/count;
					var ss=dis[name]*(1-aa*aa*aa)+start[name];
					break;
			}
			if(name=='opacity'){
				obj.style[name]=ss;
				obj.style.filter='alpha(opacity='+ss*100+')';
			}else{
				obj.style[name]=ss+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete && options.complete.call(obj);
		}
	},30);
}

//通过class获取元素
function getByClass(oParent, sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var aEle=oParent.getElementsByTagName('*');
        var arr=[];
        var reg=new RegExp('\\b'+sClass+'\\b');
        for(var i=0; i<aEle.length; i++){
            if(reg.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}

//获取绝对位置
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}

//拉钩效果公式
function hoverDir(obj, ev){
	var ScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX;
    var y=getPos(obj).top+obj.offsetHeight/2-ev.clientY-ScrollTop;

    return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
}

//随机数
function rnd(n,m){
	return parseInt(Math.random()*(m-n))+n;
}
//添加css3样式
function setStyle3(obj, name, value){
    var w=name.charAt(0).toUpperCase()+name.substring(1);
    obj.style['Webkit'+w]=value;
    obj.style['Moz'+w]=value;
    obj.style['ms'+w]=value;
    obj.style['O'+w]=value;
    obj.style[name]=value;
}






