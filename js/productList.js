$(function () {

    var userPicker = new mui.PopPicker();

    var showUserPickerButton = document.getElementById('showUserPicker');
    showUserPickerButton.addEventListener('tap', function (event) {
        userPicker.show(function (items) {
            // userResult.innerText = JSON.stringify(items[0]);
            //返回 false 可以阻止选择框的关闭
            //return false;
            console.log(items[0].value);
            page = items[0].value;
            queryList();
        });
    }, false);


    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // console.log(r); 
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    var id = getQueryString('categoryid');
    var category = getQueryString('category');

    $('.categoryName').html(' ' + category);

    var page = 1;

    queryList();

    function queryList() {
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            dataType: 'post',
            data: {
                categoryid: id,
                pageid: page
            },
            beforeSend: function () {
                $('body').addClass('loadding')
            },
            complete: function () {
                $('body').removeClass('loadding')
            },
            success: function (obj) {
                obj = JSON.parse(obj);
                console.log(obj);

                if (obj.result.length == 0) {
                    $('.empty').show();
                    $('.btn-back').on('tap', function () {
                        window.history.back();
                    })
                    return false;
                }

                var total = Math.ceil(obj.totalCount / obj.pagesize);
                //原生select框
                // var selectHtml = '';
                // for (var k = 1; k <= total; k++) {
                //     selectHtml += `<option value="${k}">${k}/${total}</option>`
                // }
                // $('.selectNum').html(selectHtml);

                // //设置当前page值选中
                // $('.selectNum').val(page);

                var data = [];
                for (var j = 1; j <= total; j++) {
                    data.push({
                        value: j,
                        text: j + '/' + total
                    });
                }
                console.log(data);
                userPicker.setData(data);

                //更新页器
                $('.btn_picker').html(page + '/' + total);

                for (var i = 0; i < obj.result.length; i++) {
                    obj.result[i]['total'] = total;
                }
                var html = template('listTemp', obj);
                $('.list-container').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0002,
                    indicators: false,
                });
                mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
            }
        });
    }

    $('.selectNum').on('change', function () {
        page = $(this).val();
        queryList();
    });


    $('.btn-pre').on('tap', function () {
        page--;
        console.log(page);
        if (page == 0) {
            mui.toast('已是第一页了', {
                duration: 'short',
                type: 'div'
            });
            page = 1;
            return false;
        }
        queryList();
    });

    $('.btn-next').on('tap', function () {
        page++;
        console.log(page);
        var totalCount = $('.product').data('total');
        if (page > totalCount || !totalCount) {
            mui.toast('已是最后一页了', {
                duration: 'short',
                type: 'div'
            });
            page = totalCount;
            return false;
        }
        queryList();
    });

});