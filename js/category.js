$(function () {
    window.addEventListener('load', function () {
        new FastClick(document.body);
    }, false);

    var that;

    $('.btn-top').on('tap', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
    });

    $.ajax({
        url: 'http://localhost:9090/api/getcategorytitle',
        beforeSend: function () {
            $('body').addClass('loadding')
        },
        complete: function () {
            $('body').removeClass('loadding')
        },
        success: function (obj) {
            console.log(obj);
            var html = template('listTemp', {
                list: obj.result
            });
            $('.list-table').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0002,
                indicators: false,
            });
            $('.list-table').on('tap', 'li', function () {
                that = this;
                tapContent();
            });
        }
    });

    function tapContent() {
        var id = $(that).data('id');
        console.log(that);
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            dataType: 'post',
            data: {
                titleid: id
            },
            success: function (obj) {
                obj = JSON.parse(obj);
                var html = template('tapTemp', {
                    list: obj.result
                });
                $('.tap-content').html(html);
            }
        })
    }
});