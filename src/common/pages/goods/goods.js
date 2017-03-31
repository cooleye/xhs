define(['text!src/pages/goods/goods.html','css!./goods.css'],function(html){

    var _current_goods_id = null;
    var goods = {
        add: function(id){
          console.log(id)
          _current_goods_id = id;
          $("#main").html(html)

          //添加加入购物车按钮
          $('.cart-add').on('click',function(){
            console.log('add')
            $('#good-zhezhao').fadeIn(400);
            $('#goods-select-window').show().animate({bottom:'0'},400)
          })

          //添加确定加入按钮
          $('#goods-add-btn').on('click',function(){
            // localStorage.current_goods_id = id;
            //把当前商品id保存起来；


            $('#good-zhezhao').fadeOut(400);
            $('#goods-select-window').animate({bottom:'-11rem'},200,function(){
              $(this).hide();
            })

            //添加购物车
            $.ajax({
              url:'http://localhost:3002/addgoods/'+_current_goods_id,
              method:'GET',
              async:true,
              success:function(res){
                if(res.msg == 'success'){
                    console.log('商品添加成功')
                }
              }
            })



          })

          //添加商品到购物车
          $('.cart-icon').on('click',function(){
                location.href = '#/cart'
          })

          var goods = JSON.parse(localStorage.goods);
          for(var i = 0;i < goods.length;i++){
            if(id == goods[i].id){
              var d = goods[i];
              var temp = '  <img src="'+d.image+'"/>\
                <h3>'+d.title+'</h3>'
              $('#good-content').html(temp)
              $('#goods-select-window-img img').attr('src',d.image)
              $('#goods-select-window-content').text(d.title)
              $('#good-content').data('id',id);
            }
          }

        }
    }

    return goods;
})
