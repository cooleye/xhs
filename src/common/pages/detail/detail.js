define(['text!./detail.html','css!./detail.css'],function(html){
  var direction = {
    add:function(id){
      // console.log('id--' + id)
        // console.log(html)
        $("#main").html(html)
    }
  }

  return direction;
})
