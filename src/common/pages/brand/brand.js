define(['text!./brand.html','css!./brand.css'],function(html){
  var direction = {
    add:function(){
        $("#main").html(html)
    }
  }

  return direction;
})
