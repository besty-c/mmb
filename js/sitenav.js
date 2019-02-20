$(function () {  
    $.ajax({
        url: "http://47.52.242.30:9090/api/getsitenav",
        success: function (data) {
            console.log(data);
            var html = template('sb',data)
            $('.link').html(html);
            $(".list-group a").lazyFade({
                reverse: false,
                duration: 1300,
                delay: 50,
                opacity: {
                    start: 0.01,
                    end: 1
                }
            });
        }
    });
    
})