define(['text!./direction.html','css!./direction.css'],function(html){
  var direction = {
    add:function(){
        $("#main").html(html)
    }
  }

  return direction;
})
