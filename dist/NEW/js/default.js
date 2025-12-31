function GoPage(code, url) {
	if ( !code )						{	window.location = "/index.php";	}
	
	//메인
	else if ( code == "main" )				{	window.location = "/index.php"; } //메인 




//카피부분 

	else if ( code == "copy1" )		{	window.location.style="cursor:hand"; window.open('/NEW/html/utillity01.html','window2','location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=700,height=650,left=100, top=20, scrollbars=yes'); }	//개인정보취급방침
	else if ( code == "copy1999" )		{	window.location.style="cursor:hand"; window.open('/NEW/html/utillity02.html','window2','location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=700,height=650,left=100, top=20, scrollbars=yes'); }	//개인정보취급방침
	else if ( code == "copy2017" )		{	window.location.style="cursor:hand"; window.open('/NEW/html/utillity02.html','window','location=yes, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=700,height=650,left=600, top=20, scrollbars=yes'); }	//이용약관
	else if ( code == "copy2019" )		{	window.location.style="cursor:hand"; window.open('/NEW/html/utillity03.html','window','location=yes, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=700,height=650,left=600, top=20, scrollbars=yes'); }	//이용약관
	else if ( code == "copy2020" )		{	window.location.style="cursor:hand"; window.open('/NEW/html/utillity04.html','window','location=yes, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=700,height=650,left=600, top=20, scrollbars=yes'); }	//이용약관
	else if ( code == "copy3" )		{	window.location.style="cursor:hand"; window.open('/utillity03.php','window3','location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=725,height=450,left=100, top=20, scrollbars=yes'); }	//저작권안내  
	else if ( code == "copy4" )		{	window.location.style="cursor:hand"; window.open('/utillity04.php','window3','location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=no, width=725,height=450,left=100, top=20, scrollbars=yes'); }	//이메일무단수집거부 






//링크방법 javascript:GoPage('sub01')
}





function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function open_win(val, wname, wopt, menu) {
	var newopt = "", wHeight = 0, wWidth = 0;
	if (wopt != undefined) {
		var woptlist = wopt.replace(/ /g, "").split(",");
		for (var i in woptlist) {
			if (woptlist[i].match(/^height=/i)) {
				wHeight = parseInt(woptlist[i].substr(7),10);
				if (!isNaN(wHeight)) newopt += "top=" + Math.floor((screen.availHeight - wHeight) / 2) + ",";
			}
			if (woptlist[i].match(/^width=/i)) {
				wWidth = parseInt(woptlist[i].substr(6),10);
				if (!isNaN(wWidth)) newopt += "left=" + Math.floor((screen.availWidth - wWidth) / 2) + ",";
			}
		}
	}

	url = val + "?" + menu;
	window.open(url, wname, newopt + wopt); 
} 

function wdRollMenu(obj,over,out)
{
 obj.src = over;
 obj.onmouseout = new Function("this.src='"+out+"'");
} 
function wdLeftMenuView(m)
{
	var mm = document.getElementById(m);
	mm.style.display = "block";
	//if(mm.style.display=="block") mm.style.display = "none";
	//else mm.style.display = "block";
}

//페이지 인식
function wdRollMenu(obj,over,out,view)
{
 obj.src = over;
 if(out) obj.onmouseout = new Function("this.src='"+out+"'");
 
 //var m  = document.getElementById("m_"+view);
 var sm = document.getElementById("sm_"+view);
 
 if(sm != null){
  sm.style.display = "block";
  //sm.onmouseout = new Function("if(this.style.display=='block') this.style.display='none'");
  //m.onmouseout  = new Function("if("+sm+".style.display=='block') "+sm+".style.display='none'");
 }
}

