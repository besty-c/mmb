$(function () {

    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    var productId = getQueryString('productId');
    var categoryId = getQueryString('categoryId');

    $('.btn-top').on('tap', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
    });

    queryCate();
    queryEvaluate();
    queryContent();

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0002,
        indicators: false,
    });

    function queryCate(){
        $.ajax({
            url:'http://localhost:9090/api/getcategorybyid',
            dataType: 'post',
            data:{
                categoryid:categoryId
            },
            success:function(obj){
                obj = JSON.parse(obj);
                // console.log(obj);
                var html = template('cateTemp',obj.result[0]);
                $('.nav').html(html);
            }
        });
    }

    function queryEvaluate(){
        $.ajax({
            url:'http://localhost:9090/api/getproduct',
            dataType: 'post',
            data:{
                productid:productId
            },
            beforeSend: function () {
                $('body').addClass('loadding')
            },
            complete: function () {
                $('body').removeClass('loadding')
            },
            success:function(obj){
                obj = JSON.parse(obj);
                // console.log(obj);
                var html = template('pingjiaInfo',obj.result[0]);
                $('.detailsInfo').html(html);
            }
        });
    }


    function queryContent(){
        $.ajax({
            url:'http://localhost:9090/api/getproductcom',
            dataType: 'post',
            data:{
                productid:productId
            },
            beforeSend: function () {
                $('body').addClass('loadding')
            },
            complete: function () {
                $('body').removeClass('loadding')
            },
            success:function(obj){
                obj = JSON.parse(obj);
                // console.log(obj);
                var html = template('pingjiaTemp',{list:obj.result});
                $('.evaluate').html(html);
            }
        });
    }

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0002,
        indicators: false,
    });

});