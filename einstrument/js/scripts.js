var pth=window.prompt('输入服务器地址（IP地址:端口）：','localhost:4088');
if(pth==null || pth=="")
{
    pth='localhost:4088';
}
var req=new XMLHttpRequest();
function v(npt)
{
    req.open("GET","http://"+pth+"/"+npt,true);
    req.send();
}
