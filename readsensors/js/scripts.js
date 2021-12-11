function round(i,n)
{
    var r;
    try
    {
        r=i.toFixed(n);
    }
    catch(err)
    {
        r=i;
    }
    return String(r);
}
var pth=window.prompt('输入服务器地址（IP地址:端口）：','localhost:4080');
if(pth==null || pth=="")
{
    pth='localhost:4080';
}
var req=new XMLHttpRequest();
var resp;
req.onreadystatechange=function()
{
    if(req.readyState==4 && req.status==200)
    {
        resp=JSON.parse(req.responseText);
        //加速度传感器
        document.getElementById("ax").innerText=round(resp.acceleration[0],3);
        document.getElementById("ay").innerText=round(resp.acceleration[1],3);
        document.getElementById("az").innerText=round(resp.acceleration[2],3);
        //磁场传感器
        document.getElementById("mx").innerText=round(resp.magnet[0],3);
        document.getElementById("my").innerText=round(resp.magnet[1],3);
        document.getElementById("mz").innerText=round(resp.magnet[2],3);
        //方向传感器
        document.getElementById("azimu").innerText=round(resp.orientation.azimuth,1);
        document.getElementById("pitch").innerText=round(resp.orientation.pitch,1);
        document.getElementById("roll").innerText=round(resp.orientation.roll,1);
        //陀螺仪
        document.getElementById("gx").innerText=round(resp.gyroscope[0],4);
        document.getElementById("gy").innerText=round(resp.gyroscope[1],4);
        document.getElementById("gz").innerText=round(resp.gyroscope[2],4);
        //光线传感器
        document.getElementById("li").innerText=round(resp.light[0],0);
        //距离传感器
        document.getElementById("pr").innerText=round(resp.proximity[0],0);
        //重力传感器
        document.getElementById("grx").innerText=round(resp.gravity[0],3);
        document.getElementById("gry").innerText=round(resp.gravity[1],3);
        document.getElementById("grz").innerText=round(resp.gravity[2],3);
        //线性加速度计
        document.getElementById("lix").innerText=round(resp.linear_acceleration[0],3);
        document.getElementById("liy").innerText=round(resp.linear_acceleration[1],3);
        document.getElementById("liz").innerText=round(resp.linear_acceleration[2],3);
        //旋转矢量传感器
        document.getElementById("rox").innerText=round(resp.rotation[0],3);
        document.getElementById("roy").innerText=round(resp.rotation[1],3);
        document.getElementById("roz").innerText=round(resp.rotation[2],3);
        document.getElementById("ro").innerText=round(resp.rotation[3],3);
        //计步器
        document.getElementById("step").innerText=round(resp.step_counter,0);
        //卫星定位
        document.getElementById("longi").innerText=round(resp.location.longitude,6);
        document.getElementById("lati").innerText=round(resp.location.latitude,6);
        document.getElementById("alti").innerText=round(resp.location.altitude,1);
        document.getElementById("bear").innerText=round(resp.location.bearing,1);
        document.getElementById("speed").innerText=round(resp.location.speed,1);
        document.getElementById("time").innerText=round(resp.location.time,0);
        redo();
    }
};
function redo()
{
    req.open("GET","http://"+pth+"/",true);
    req.send();
}
redo();
