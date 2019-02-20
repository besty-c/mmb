$(function (){
    

    $.ajax({
        url:'http://localhost:9090/api/getinlanddiscount',
        success:function(obj){
            console.log(obj);
            var html = template('list',{list:obj.result});
            $('.discount-list').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });$
        }
    })
    $('.discount-list').on('tap','.inland-discount-list' ,function () { 
        var id = $(this).data('id');
        console.log(id);
        location='discount-product.html?id='+id;

     })



})