$(function(){

     var id = location.search.substr(4)

    console.log(id);
    

    $.ajax({
        url:'http://localhost:9090/api/getmoneyctrlproduct',
        data:{productid: id},
        success:function(data){
            console.log(data);
            var html = template('moneyctrltwoTpl',data);
            $('#main').html(html);
            $('#comment').html(data.result[0].productComment)
        }
    });

    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 

    $("#toTop").on("tap",function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
})