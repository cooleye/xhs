define(['text!./all.html','lazyload','css!./all.css'],function(html,lazyload){

  var _Goods = null;
  var all = {
      add: function(){

        $(".buy-content").html(html)

        this.initWaterFall();
      },
      setGoodsInfo: function(datas){
          _Goods = datas;
          // localStorage.goods = JSON.stringify(_Goods);
          localStorage['goods'] = JSON.stringify(_Goods);
      },
      getGoodsInfo: function(){
          return _Goods;
      },
      getItems: function(url){

        var that = this;
        $.get(url,function(res){
          console.log(res)
            if(res.success == true){
               var datas = res.data;
               that.setGoodsInfo(datas);
               var left = [];
               var right = [];
               for(var i = 0; i< datas.length;i++){
                  if(i %2 == 0){
                    var p = getItem(datas[i]);
                    left.push(p);
                  }else {
                    var p = getItem(datas[i]);
                    right.push(p);
                  }
               }

               $('.waterfall-content-left').append(left.join(''));
               $('.waterfall-content-right').append(right.join(''));

               $('.box').on('touchstart',function(e){
                  var id = $(this).data('id');

                  location.href="#/goods/" + id
                          // location.href="#/goods/?id=" + id
               })

            }
        })
      },
      initWaterFall:function(l){

          this.getItems('http://127.0.0.1:3002/getall');
          // this.scrollAppend();
          $("img.lazy").lazyload({
            effect : "fadeIn"
          });
      },
      scrollAppend:function(){
        var that = this;
        $(window).on('scroll',function(){
          console.log('sss')
          var scrollTop = $(window).scrollTop() + $(window).height();
          $last =  $('.waterfall-content-left .box').last();
          var $lastScroll = $last.offset().top;

          if(scrollTop > $lastScroll){
              that.getItems('http://127.0.0.1:3002/getall');
          }

          if($(window).scrollTop() >= 51){
            $('#life-menu').addClass('fixed-menu')
          }else {
            $('#life-menu').removeClass('fixed-menu')
          }
        })

      }
  }

  function getItem(data){
      var item =
          '<div class="box" data-id="'+data.id+'">\
            <img src="'+data.image+'" />\
            <div class="item-title"><h5>'+data.title+'</h5></div>\
            <div class="item-desc">'+data.desc+'</div>\
            <div class="item-price">\
              <span>'+data.discount_price+'￥</span>\
            </div>\
          </div>'

      return item;
  }

  return all;
})
