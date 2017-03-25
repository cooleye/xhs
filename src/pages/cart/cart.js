define(['jquery','text!./cart.html','css!./cart.css'],function($,html){
      var cart = {
        init : function(){
          $('#upper-container').html(html)
          $('#upper-container').show();

          this.getCartData();
        },
        getCartData:function(){
          $.get('http://localhost:3002/getcartdata',function(res){
              var data = res.data;
              var htmls = [];
              for(var i = 0; i < data.length;i++){
                 htmls.push(templage(data[i]));
              }

              // $('#goods-lists').html(htmls)
          })
        }
      }



      function templage(data) {
          var str = '  <div class="goods-item">\
                <div class="goods-item-radio">\
                    <input type="radio"/>\
                </div>\
                <div class="goods-item-img">\
                    <img src="'+data.image+'"/>\
                </div>\
                <div class="goods-item-name">'+data.title+'</div>\
                <div class="goods-item-del">删除</div>\
            </div>'

            return str;
      }
      return cart;
})
