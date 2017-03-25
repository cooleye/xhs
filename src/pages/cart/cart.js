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
