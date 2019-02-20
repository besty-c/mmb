$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})

var page;

var flag=true;

getData(0);

function getData(pageID) {

    page=pageID;
    console.log(page);
    if (page == 0) {
        $('#previous').addClass("disabled");
    } else {
        $('#previous').removeClass("disabled");
    }
    if (page == 14) {
        $('#below').addClass("disabled");
    } else {
        $('#below').removeClass("disabled");
    }

    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        data: {
            pageid: pageID,
        },
        success: function (data) {
            console.log(data);
            totalPage = Math.ceil(data.totalCount / data.pagesize)
            var html = template('monenyTpl', data);
            $('#main .mui-table-view').html(html);
            $('#main .mui-table-view a').on('click',function(){
                console.log(3531);
    
                console.log($(this).data('id'));
                
                location = 'shoppls.html?productid='+ $(this).data('id');})
            var allPage = Math.ceil(data.totalCount / data.pagesize);
            if (flag == true) {
                newOpt(allPage);
                flag = false;
            }
            $('#selectAge').val(page + 1);
        }
    });

    function newOpt(allPage) {
        for (var i = 0; i < allPage; i++) {
            var opt = document.createElement('option');
            opt.value = i + 1;
            opt.innerHTML = opt.value + '/' + allPage;
            $('#selectAge').append(opt);
        }
    }
    
    
    // 点击返回顶部
    $("#toTop").on("tap",function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });
}



