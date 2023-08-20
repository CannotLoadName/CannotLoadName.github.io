var submitted=false;
function getSex()
{
    if(document.getElementById("sexF").checked)
    {
        return "女";
    }
    else if(document.getElementById("sexM").checked)
    {
        return "男";
    }
    else
    {
        return "未选择";
    }
}
function getClass()
{
    if(document.getElementById("class5").checked)
    {
        return "5班";
    }
    else if(document.getElementById("class4").checked)
    {
        return "4班";
    }
    else if(document.getElementById("class3").checked)
    {
        return "3班";
    }
    else if(document.getElementById("class2").checked)
    {
        return "2班";
    }
    else if(document.getElementById("class1").checked)
    {
        return "1班";
    }
    else if(document.getElementById("classC").checked)
    {
        return "创新班";
    }
    else
    {
        return "未选择";
    }
}
function getTransfer()
{
    if(document.getElementById("transferT").checked)
    {
        return "是";
    }
    else if(document.getElementById("transferF").checked)
    {
        return "否";
    }
    else
    {
        return "未选择";
    }
}
function getTransferTeam()
{
    if(document.getElementById("transferTT").checked)
    {
        return "是";
    }
    else if(document.getElementById("transferTF").checked)
    {
        return "否";
    }
    else
    {
        return "未选择";
    }
}
function getSelection(slid)
{
    var slord=document.getElementById(slid).selectedIndex;
    var sltxt=document.getElementById(slid).options;
    if(slord>=0&&slord<sltxt.length)
    {
        if(sltxt[slord].text=="ITC (信息技术中心)")
        {
            return "ITC";
        }
        else
        {
            return sltxt[slord].text;
        }
    }
    else
    {
        return "未选择";
    }
}
function submit()
{
    var data={
        name:document.getElementById("name").value,
        sex:getSex(),
        class:getClass(),
        id:document.getElementById("id").value,
        phone:document.getElementById("phone").value,
        introduction:document.getElementById("introduction").value,
        choice1:getSelection("choice1"),
        choice2:getSelection("choice2"),
        allowTransfer:getTransfer(),
        choiceTeam:getSelection("choiceT"),
        allowTransferTeam:getTransferTeam()
    };
    if(!submitted)
    {
        Swal.fire({
            title:"正在提交",
            text:"等待小黑猫旋转三秒钟......",
            iconHtml:"<img src=\"./image/loading.gif\" alt=\"小黑猫旋转\" class=\"loadingDialogue\"/>",
            iconColor:"transparent",
            confirmButtonText:"返回",
            allowOutsideClick:false
        });
        var obj1=new XMLHttpRequest();
        obj1.open("POST","/api",true);
        obj1.setRequestHeader("Content-Type","application/json");
        obj1.onreadystatechange=function()
        {
            if(obj1.readyState==4)
            {
                Swal.close();
                if(obj1.status==200)
                {
                    submitted=true;
                    Swal.fire({
                        title:"报名成功",
                        text:"感谢报名，请留意面试通知短信。如需修改报名信息，再次提交即可。",
                        icon:"success",
                        confirmButtonText:"返回",
                        allowOutsideClick:false
                    });
                }
                else if(obj1.status==400)
                {
                    Swal.fire({
                        title:"提交失败",
                        text:"输入信息有错误，请仔细检查。",
                        icon:"warning",
                        confirmButtonText:"返回",
                        allowOutsideClick:false
                    });
                }
                else
                {
                    Swal.fire({
                        title:"提交失败",
                        text:"服务器错误，请重试。状态码："+String(obj1.status),
                        icon:"error",
                        confirmButtonText:"返回",
                        allowOutsideClick:false
                    });
                }
            }
        };
        obj1.send(JSON.stringify(data));
    }
    else
    {
        Swal.fire({
            title:"提交失败",
            text:"已提交成功，请勿重复提交。如需修改报名信息，请刷新页面。",
            icon:"warning",
            confirmButtonText:"返回",
            allowOutsideClick:false
        });
    }
}
function search()
{
    Swal.fire({
        title:"正在查询",
        text:"等待小黑猫旋转三秒钟......",
        iconHtml:"<img src=\"./image/loading.gif\" alt=\"小黑猫旋转\" class=\"loadingDialogue\"/>",
        iconColor:"transparent",
        confirmButtonText:"返回",
        allowOutsideClick:false
    });
    var obj2=new XMLHttpRequest();
    obj2.open("GET","/api?id="+document.getElementById("cxid").value,true);
    obj2.onreadystatechange=function()
    {
        if(obj2.readyState==4)
        {
            Swal.close();
            if(obj2.status==200)
            {
                var resp=JSON.parse(obj2.responseText);
                Swal.fire({
                    title:"查询成功",
                    html:"<dl class=\"dialogue\"><dt>姓名</dt><dd>"+resp.name
                        +"</dd><dt>性别</dt><dd>"+resp.sex
                        +"</dd><dt>班级</dt><dd>"+resp.class
                        +"</dd><dt>学号</dt><dd>"+resp.id
                        +"</dd><dt>联系电话</dt><dd>"+resp.phone
                        +"</dd><dt>团学部门第一志愿</dt><dd>"+resp.choice1
                        +"</dd><dt>团学部门第二志愿</dt><dd>"+resp.choice2
                        +"</dd><dt>团学部门是否服从调剂</dt><dd>"+resp.allowTransfer
                        +"</dd><dt>团学队伍志愿</dt><dd>"+resp.choiceTeam
                        +"</dd><dt>团学队伍是否服从调剂</dt><dd>"+resp.allowTransferTeam
                        +"</dd><dt>自我介绍</dt><dd>"+resp.introduction
                        +"</dd></dl>",
                    icon:"info",
                    confirmButtonText:"返回",
                    allowOutsideClick:false
                });
            }
            else if(obj2.status==404)
            {
                Swal.fire({
                    title:"查询失败",
                    text:"你还未报名，快去报名吧！",
                    icon:"warning",
                    confirmButtonText:"返回",
                    allowOutsideClick:false
                });
            }
            else if(obj2.status==400)
            {
                Swal.fire({
                    title:"查询失败",
                    text:"学号格式有错误，请仔细检查。",
                    icon:"warning",
                    confirmButtonText:"返回",
                    allowOutsideClick:false
                });
            }
            else
            {
                Swal.fire({
                    title:"查询失败",
                    text:"服务器错误，请重试。状态码："+String(obj2.status),
                    icon:"error",
                    confirmButtonText:"返回",
                    allowOutsideClick:false
                });
            }
        }
    };
    obj2.send();
}
function init()
{
    $(document).ready(()=>{
        $(document).foundation();
    });
}