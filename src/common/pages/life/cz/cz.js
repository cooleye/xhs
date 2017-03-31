define(['text!./cz.html','css!./cz.css'],function(html,Swiper){
  var hf = {
      add:function(){
        $(".life-content").html(html)
      }
  }

  return hf;
})
