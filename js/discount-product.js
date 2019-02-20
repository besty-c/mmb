$(function (){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    var id = getQueryString('id');
    getQueryString('id');
    console.log(id);

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }

    $.ajax({
        url:'http://localhost:9090/api/getdiscountproduct',
        data:{
            productid:id
        },
        success:function(obj){
            console.log(obj);
            var html = template('productDetailsTpl',obj)
            
            $('.productDetails').html(html);

            // 评论的模版生成
            // var commentHtml = template('commentTpl',obj);

            // $('#comment').html(commentHtml);
        }
    })
    
})