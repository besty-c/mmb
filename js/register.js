$(function(){
    $(".btn").on('tap',function(){
        var check = true;
        mui(".surface input").each(function() {
            //若当前input为空，则alert提醒 
            if(!this.value || this.value.trim() == "") {
            var text = $(this).data("name");
                mui.alert(text+ "不允许为空");
                this.value = '';
                check = false;
                return false;
            }
            }); //校验通过，继续执行业务逻辑 
            
            if(check){
                if($(".yanzma").val()!=5705){
                    mui.alert("验证码错误,请重新输入");
                    return false;
                }
                location = "login.html"
            }
    })
})