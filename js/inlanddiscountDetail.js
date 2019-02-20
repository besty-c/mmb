$(function () {
    var url = location.href;
    // console.log(url);
    var id = url.split("=")[1];
    // console.log(id);

    // 详情 请求

    $.ajax({
        url: "http://localhost:9090/api/getdiscountproduct",
        data: {
            productid: id
        },
        success: function (obj) {
            console.log(obj);
            var html = template("details", obj)
            $(".goods").html(html);
            var html = template('commentTpl',obj)
            $('.discuss').html(html);
        }
    });


    $(".discuss").on("tap",'.tjdp', function () {
        var text = $("#ctl00_ContentBody_txt_nr").val().trim();
       if(text==""){
           mui.alert("内容不能为空");

       }else{
        var li = `<li class="mui-card-header mui-card-media">
        <img src="../images/logo.png" />
        <div class="mui-media-body">
        小M
        <p>`+text+`</p>
        <p>发表于 2016-06-30 15:30</p>
        </div>
    </li>`;
    // console.log(div);
    $(".list ul").prepend(li)
    $("#ctl00_ContentBody_txt_nr").val("");
       }


                    

    })






})