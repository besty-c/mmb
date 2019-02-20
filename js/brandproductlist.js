$(function () {
    // 获取dataTitleId
    var dataTitleId = getQueryString('dataTitleId')
    // 获取brandName
    var brandName = getQueryString('brandName');
    $('#main .title span').html(brandName)
    getBrandProductList(1)

    function getBrandProductList(count) {
        $.ajax({
            url: 'http://47.52.242.30:9090/api/getbrandproductlist',
            data: {
                brandtitleid: dataTitleId,
                pagesize: 4 * count
            },
            success: function (result) {
                console.log(result);
                var html = template('brandproductlist', result)
                $('#main .ranklist').html(html)
            }
        })
    }

        var num = 1;
    $('#main .more').on('tap',function(){
        num++;
        console.log(num);
        getBrandProductList(num)

    })

    // 给li添加点击事件
    $('#main .ranklist').on('tap','li',function(){
        var $this = $(this)
        var productid =$this.data('product-id')
        var brandName =$this.data('brand-name')
        var productName =$this.data('product-name')
        var productImg =$this.data('img')
        location ='productcom.html?productid='+productid+'&brandName='+brandName+'&productImg='+productImg+'&productName='+productName
    })


    
    // 截取字符串
    // brandtitle = brandtitle.substring(0,4)
    // console.log(brandtitle);
    // $('#main .title span').html(brandtitle)




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