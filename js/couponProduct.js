$(function () {

    getQueryString('couponid');
    var couponid = getQueryString('couponid');
    // console.log(couponid);


    $.ajax({
        url: 'http://localhost:9090/api/getcouponproduct',
        data: {
            'couponid': couponid
        },
        success: function (data) {
            // console.log(data);
            var html = template('couponProduct', data);
            $('.mui-row').html(html);
        }

    })

    $.ajax({
        url: 'http://localhost:9090/api/getcouponproduct',
        data: {
            'couponid': couponid
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var html = template('slide', data);
            $('.mui-backdrop').html(html);
        }

    })

    //初始化
    //获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});

//显示遮罩层
        $('.mui-row').on('click',function () { 

            $('.mui-backdrop').show();
         });

         




//替换标题
    var title;
    if (couponid == 0) {
        title = "肯德基优惠券";
    } else if (couponid == 1) {
        title = "必胜客优惠券"
    } else if (couponid == 2) {
        title = "棒约翰优惠券"
    } else if (couponid == 3) {
        title = "哈根达斯优惠券"
    }

    $('.header .center h4').html(title);
    $('#footer .rank .title').html(title);



    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }
})