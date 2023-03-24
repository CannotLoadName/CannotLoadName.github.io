var toneNames=["ido","ireb","ire","imib","imi","ifa","isob","iso","ilab","ila","isib","isi","ldo","lreb","lre","lmib","lmi","lfa","lsob","lso","llab","lla","lsib","lsi","mdo","mreb","mre","mmib","mmi","mfa","msob","mso","mlab","mla","msib","msi","hdo","hreb","hre","hmib","hmi","hfa","hsob","hso","hlab","hla","hsib","hsi","sdo","sreb","sre","smib","smi","sfa","ssob","sso","slab","sla","ssib","ssi"];
function printTable()
{
    var d="<table>",i=0,j=0;
    while(12*i+j<toneNames.length)
    {
        d+="<tr>";
        while(j<12)
        {
            d+="<td><button type='button' ";
            if(toneNames[12*i+j].charAt(toneNames[12*i+j].length-1)=="b")
            {
                d+="class='b' ";
            }
            d+="onclick='audioPlay(\""+toneNames[12*i+j]+"\");'>音符"+toneNames[12*i+j]+"</button></td>";
            j++;
        }
        d+="</tr>";
        j=0;
        i++;
    }
    document.write(d+"</table>");
}
var toneObjects=[];
for(var i=0;i<toneNames.length;i++)
{
    toneObjects.push(new Audio("./audio/"+toneNames[i]+".wav"));
}
function audioPlay(x)
{
    var i=toneNames.indexOf(x);
    if(i>=0)
    {
        toneObjects[i].currentTime=0;
        toneObjects[i].play();
    }
}