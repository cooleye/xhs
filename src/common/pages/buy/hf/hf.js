define(['text!./hf.html','lazyload','css!./hf.css'],function(html,lazyload){
  var hf = {
      add:function(){
        $(".buy-content").html(html)
      }
    }
  return hf;
})
