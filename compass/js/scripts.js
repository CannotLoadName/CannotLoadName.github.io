var frm1='<svg width="20em" height="20em"><circle cx="10em" cy="10em" r="8em" fill="Yellow"/><text x="5.4em" y="2em" font-size="2em" fill="Red">N</text><text x="1.3em" y="6.1em" font-size="2em" fill="Red">W</text><text x="5.4em" y="10.2em" font-size="2em" fill="Red">S</text><text x="9.5em" y="6.1em" font-size="2em" fill="Red">E</text><line x1="11.5em" y1="11.5em" x2="';
var frm2='em" y2="';
var frm3='em" stroke="LimeGreen" stroke-width="0.2em"/></svg><h2>Z:';
var frm4='º</h2>';
var pth=window.prompt('输入服务器地址（IP地址:端口）：','localhost:4080');
if(pth==null || pth=="")
{
    pth='localhost:4080';
}
var req=new XMLHttpRequest();
var resp,x,y;
req.onreadystatechange=function()
{
    if(req.readyState==4 && req.status==200)
    {
        resp=JSON.parse(req.responseText).orientation.azimuth;
        x=(11.5-7.5*Math.sin(resp*3.1416/180)).toFixed(4);
        y=(11.5-7.5*Math.cos(resp*3.1416/180)).toFixed(4);
        document.getElementById("swiz").innerHTML=frm1+x+frm2+y+frm3+resp.toFixed(2)+frm4;
        redo();
    }
};
function redo()
{
    req.open("GET","http://"+pth+"/orientation",true);
    req.send();
}
redo();
