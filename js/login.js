$(function(){
    $(".btn").on('tap',function(){
        if($(".clear").val()!=520 && $(".password").val()!=1314){
            mui.alert("账号密码可能错误,请重新输入");
            $(".clear").val('')
            $(".password").val('')
        }else{
            // mui.alert("密码正确,即将跳转");
            location = "../index.html";
        }
        
    })
})