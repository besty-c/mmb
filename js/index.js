$(function(){
    // 轮播图初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    // nav
    $.ajax({
        url:"http://localhost:9090/api/getindexmenu",
        datatype:"json",
        success:function(obj){
            // var attr = [];
            // for(var i = 0 ; i < obj.result.length;i++){
            //   obj.result[7].titlehref.replace('more.html','javascript:void(0)')
            //   attr += obj.result[i];
            // }
            // console.log(attr);
            
            var html = template("nav",obj);
            $(".content").html(html);
            
        }
    });
    
    // $("#number8").hide()
    //     $("#number9").hide()
    //     $("#number10").hide()
    //     $("#number11").hide()
    // 更多按钮 点击显示第三行导航栏 
    // 切换类
    $(".content").on("tap","#number7",function(){
        
        $("#number8").toggleClass("hide")
        $("#number9").toggleClass("hide")
        $("#number10").toggleClass("hide")
        $("#number11").toggleClass("hide")
        console.log(1111111);
        
        // console.log($("#number7").find('a').css()["0"])
        // 修改了 更多href
        $("#number7").find('a').css()["0"].href="javascript:void(0)";
   
    });

    $.ajax({
        url:"http://localhost:9090/api/getmoneyctrl",
        datatype:"json",
        success:function(obj){
            console.log(obj);
            var html = template("reco",obj);
            $(".discount").html(html);
            
        }
    })
    // 点击进入商品详情页
    //    $(".discount").on("tap",".box",function(){
    //        console.log($(this).data("id"));
        // var id = $(this).data("id")
        //    location="/pages/inlanddiscountDetail.html?id="+id;
           
    //    })
       
   
    
    
})