$(function(){
    // 页面首页 请求
    var id = 0
    $.ajax({
        url:"http://localhost:9090/api/getinlanddiscount",
        success:function(obj){
            console.log(obj);
           id = obj.result[0]._id
            console.log(id);
            
            var html = template("discountlist",obj);
            $(".list").html(html);
        }
    });
    

    // 详情 请求
    $(".list").on("tap","li",function(){
        var id = $(this).data("id");
        location="inlanddiscountDetail.html?id="+id

    $.ajax({
        url:"http://localhost:9090/api/getdiscountproduct",
        data:{
            productid:id
        },
        success:function(obj){
            console.log(obj);
        }
    })
    
    })
})
