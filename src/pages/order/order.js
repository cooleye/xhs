define(['text!./order.html','pingpp','css!./order.css'],function(html,pingpp){



  //支付接口地址
  var YOUR_URL = 'http://127.0.0.1:3002/pay';
  function wap_pay(channel) {

      if(YOUR_URL.length === 0 || !YOUR_URL.startsWith('http')){
          alert("请填写正确的URL");
          return;
      }

      //获取支付金额
      var amount = parseInt($('.total-price').text());
      amount = parseInt(amount);

      $.post(YOUR_URL,{
          channel: channel,
          amount: amount
      },function(charge){
          console.log(charge);
          pingpp.createPayment(charge, function(result, err) {
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
