define(['text!./order.html','css!./order.css'],function(html){

        var orderModule = {
            init : function(){
                   $('#upper-container').html(html)
                   $('#upper-container').show();

                   this.getDatas();
            },
            getDatas : function(){
                $.get('http://localhost:3002/getcartdata',function(res){
                     var htmls = baidu.template('order-goods-lists',res);
                     console.log(htmls)
                     $('.order-content ul').html(htmls)
                });
            }
        };

        return orderModule;
})