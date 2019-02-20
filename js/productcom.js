$(function(){
    var brandName=getQueryString('brandName')
    var productid= getQueryString('productid');
    var productImg= getQueryString('productImg');
    var productName= getQueryString('productName');
    // console.log(productid,brandName);
    $('#main .title span').html(brandName)
    $('#main .mmbcom .mui-pull-left').html(productImg)
    $('#main .mmbcom .mui-media-body .mui-ellipsis').html(productName)

    $.ajax({
        url:'http://47.52.242.30:9090/api/getproductcom',
        data:{productid:productid},
        success:function(result){
            // console.log(result);
            var html = template('productcom',result)
            $('#main .mmbcom').append(html)
        }
    })

    // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})