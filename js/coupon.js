$(function () { 
    $.ajax({
        url:'http://localhost:9090/api/getcoupon',
        success:function(data){
            console.log(data);
            var html = template('product',data);
            $('.mui-row').html(html);
        }
    })
 })