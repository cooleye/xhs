define(['text!./order.html','pingpp','css!./order.css'],function(html,pingpp){



  var YOUR_URL = 'http://127.0.0.1:3002/pay';
  function wap_pay(channel) {

      if(YOUR_URL.length === 0 || !YOUR_URL.startsWith('http')){
          alert("请填写正确的URL");
          return;
      }

      // var amount = parseInt($('#total-price').val());
      // amount = parseInt(amount);
      var amount = 100;
      console.log('amount:' + amount);
      $.post(YOUR_URL,{
          channel: channel,
          amount: amount
      },function(res){
          console.log(res);
          pingpp.createPayment(res, function(result, err) {
              console.log(result);
              console.log(err.msg);
              console.log(err.extra);
          });
      })
  }


        var orderModule = {
            init : function(){
                   $('#upper-container').html(html)
                   $('#upper-container').show();

                   this.getDatas();
                   this.bindEvent();
            },
            getDatas : function(){
                $.get('http://localhost:3002/getcartdata',function(res){
                     var htmls = baidu.template('order-goods-lists',res);
                     console.log(htmls);
                     $('.order-content ul').html(htmls)
                });
            },
            bindEvent : function(){
              $('#paybtn').on('click',function(){
                  wap_pay('alipay_wap');
              });
            }
        };

        return orderModule;
});
