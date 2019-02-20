$(function () {
    //区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
    //title的点击事件
    $('.nav-title li i').on('tap', function () {
        //切换箭头
        $(this).toggleClass('fa-angle-down');
        $(this).toggleClass('fa-angle-up');
        //显示和隐藏内容
        if ($(this).hasClass('fa-angle-down')) {
            $('.nav-content').hide();
        } else {
            $('.nav-content').show();
        }
        var li = $(this).parents()[0];
        if ($(li).hasClass('shop')) {
            //发送请求获得数据
            $.ajax({
                url: 'http://localhost:9090/api/getgsshop',
                success: function (obj) {
                    var title = $(".nav-title .shop").find('span').html();
                    // console.log(title);
                    // console.log(obj);
                    obj['title'] = title;
                    var html = template('navshopTpl', obj);
                    $('.nav-content ul').html(html);
                }

            })
        } else if ($(li).hasClass('eara')) {
            $.ajax({
                url: 'http://localhost:9090/api/getgsshoparea',
                success: function (obj) {
                    var title = $(".nav-title .eara").find('span').html();
                    obj['title'] = title;
                    for(var i = 0;i < obj.result.length;i++){
                        // console.log(obj.result[i].areaName);
                        obj.result[i]['erea'] = obj.result[i].areaName.substr(0,2);
                        
                    }
                    // console.log(obj);
                    var html = template('navearaTpl', obj);
                    $('.nav-content ul').html(html);
                }
            })
        } else {
            $('.nav-content ul').html("");
        }

    })
    //内容的点击事件
    var shopId = 0;
    var earaId = 1;
    $('.nav-content ul').on('tap', 'li', function () {
        var text = $(this).find('span').html();
        if ($(this).hasClass('shop')) {
            $('.nav-title ul .shop span').html(text);
            shopId = $(this).data('id');
            $(this).find('i').addClass('fa-check')
            $(this).siblings().find('i').removeClass('fa-check');
            $('.nav-content').hide();
            //切换箭头
            $('.nav-title .shop i').toggleClass('fa-angle-down');
            $('.nav-title .shop i').toggleClass('fa-angle-up');

        } else if ($(this).hasClass('eara')) {
            text = text.substr(0, 2);
            console.log(text);
            
            $('.nav-title ul .eara span').html(text);
            earaId = $(this).data('id');
            $(this).find('i').addClass('fa-check');
            $(this).siblings().find('i').removeClass('fa-check');
            $('.nav-content').hide();
            //切换箭头
            $('.nav-title .eara i').toggleClass('fa-angle-down');
            $('.nav-title .eara i').toggleClass('fa-angle-up');
        }

    })


    //搜索的点击事件
    $('.search').on('tap', function () {
        console.log(shopId, earaId);
        getgsdetail();
        $('.nav-content').hide();
        
    })

    getgsdetail();
    //发送商品列表请求
    function getgsdetail() {
        $.ajax({
            url: 'http://localhost:9090/api/getgsproduct',
            data: {
                shopid: shopId,
                areaid: earaId,
            },
            success: function (obj) {
                // console.log(obj);
                //调用模板
                var html = template('prodtcuTpl', obj);
                $('.product-list .product-ul').html(html);

            }
        })
    }




})