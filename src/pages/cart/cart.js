define(['jquery','text!./cart.html','css!./cart.css'],function($,html){
     
  
      var cart = {
        init : function(){
          $('#upper-container').html(html)
          $('#upper-container').show();

          this.getCartData();
        },
        getCartData:function(){

          var that = this;
          $.get('http://localhost:3002/getcartdata',function(res){              
              var htmls = baidu.template('goods-templage',res);
              $('#goods-lists').html(htmls)
              that.bindEvent();
          })
        },
        bindEvent : function(){

                var that = this;
                that.countTotal();
                //全选
                $('.selectall>.item-select').on('click',function(){
                    if($(this).data('selected') == true){
                        $(this).removeClass('checkbox-select');
                        $(this).data('selected',false)
                        $('.single-radio>.item-select').each(function(a,b){
                            $(this).removeClass('checkbox-select');
                            $(this).data('selected',false)
                        })
                    }else{
                        $(this).addClass('checkbox-select');
                        $(this).data('selected',true)
                        $('.single-radio>.item-select').each(function(){
                            $(this).addClass('checkbox-select');
                            $(this).data('selected',true)
                        })
                    }

                })

                //单选
                $('.single-radio>.item-select').on('click',function(){
                    if($(this).data('selected') == true){
                        $(this).removeClass('checkbox-select');
                        $(this).data('selected',false)
                        $('.selectall>.item-select').removeClass('checkbox-select');
                        $('.selectall>.item-select').data('selected',false)
                    }else{
                        $(this).addClass('checkbox-select');
                        $(this).data('selected',true)

                         $('.single-radio>.item-select').each(function(){
           
                            if($(this).data('selected') == false){
                                $('.selectall>.item-select').removeClass('checkbox-select');
                                $('.selectall>.item-select').data('selected',false)
                                return false;
                            }else{
                                 $('.selectall>.item-select').addClass('checkbox-select');
                                 $('.selectall>.item-select').data('selected',true)
                            }
                        })

                    }

                   
                    
                })


                //点击加号按钮
                $(".add-btn").on('click',function(){
                    var num = $(this).siblings('.num').text();
                    num = parseInt(num);
                    num++;
                    $(this).siblings('.num').text(num);
                    that.countTotal();
                });

                //点击减号按钮
                 $(".min-btn").on('click',function(){
                    var num = $(this).siblings('.num').text();
                    num = parseInt(num);
                    console.log(num)
                    if(num >1){
                        num--;
                    }
                    $(this).siblings('.num').text(num);
                    that.countTotal();
                });

                //点击删减按钮
                $('.goods-item-del').on('click',function(){
                //    console.log('delete');
                   var good =  $(this).parents('.goods-item')
                   var id = good.data('id'); 
                   that.removeItem(id,good);
                });

                //点击结算，生成订单
                $('.cart-jsbtn').on('click',function(){
                          location.href = '#/order';
                });
        },
        removeItem:function(id,good){
            console.log(id);
             $.get('http://localhost:3002/removegoods',function(res){
                    if(res.msg == 'success'){
                        $(good).remove();
                    }
             });
        },
        countTotal:function(){
            var _totalPrice = 0;
            $('.goods-item').each(function(){
                var price = $(this).find('.goods-price').text();
                var num = $(this).find('.num').text();
                price = parseInt(price);
                num = parseInt(num);
                var price = num * price;
                _totalPrice += price;
                $('.cart-total-num').text(_totalPrice);
            })
        }
      };



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
