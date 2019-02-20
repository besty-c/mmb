$(function () {
    var titleid = 0;
    // 给导航条每一个li标签添加点击事件
    $('.nav-category').on('tap', 'li', function () {
        // 给被点击的标签添加active的类名
        $(this).addClass('active').siblings().removeClass('active');
        titleid = $(this).data('title-id');
        getGoods();
    })
    //通过ajax获取分类信息数据
    $.ajax({
        url: "http://localhost:9090/api/getbaicaijiatitle",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var html = template('nav-tml', {
                list: data.result
            })
            $('.nav-category').html(html);
            //动态计算ul的宽,给ul设置宽度,设置30是为了不让搜索框挡住
            var ulW = 30;
            $('.nav-category li').each(function () {
                var liW = $(this).width();
                ulW += liW;
            })
            $('.nav-category').width(ulW);
            //给导航条滑块初始化
            mui(' #nav .mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    });
    //给搜索按钮设置点击事件,控制搜索盒子的隐藏和显示
    $('.search').hide()
    $('.search-btn').on('tap', function () {
        $('.search').toggle();
    })

    //封装获取商品详情的函数
    function getGoods() {
        $.ajax({
            url: "http://localhost:9090/api/getbaicaijiaproduct",
            data: {
                titleid: titleid
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html = template('goods-tml', {
                    list: data.result
                })
                $('.goods-view').html(html);
                //给商品区域滑块初始化
                mui(' #main .mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                //返回页面顶部
                mui('#main .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
            }
        });
    }
    getGoods();

    //添加回到页面顶部的事件
    $('#footer .back-top,.btn-backTop').on('tap', function () {
        mui('#main .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
    })

    //监听主体区域的页面滚动事件,当页面滚动一定距离后返回顶部按钮隐藏
    $('.btn-backTop').hide();
    var scroll = mui('#main .mui-scroll-wrapper').scroll(); 
    $('#main .mui-scroll-wrapper' ).on('scroll', function (e) { 
      if (scroll.y <= -700) {
          $('.btn-backTop').show();
      }else {
        $('.btn-backTop').hide();
      }
    }) 

});