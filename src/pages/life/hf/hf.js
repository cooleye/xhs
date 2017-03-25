define(['text!./hf.html','lazyload','css!./hf.css'],function(html,lazyload){
  var hf = {
      add:function(){
        $(".life-content").html(html)
      },
      getItems:function(url){
        $.get(url,function(res){
            if(res.success == true){
               var notes = res.data.notes;
               var left_html = [];
               var right_html = [];
               for(var i = 0; i< notes.length;i++){
                  if(i % 2 == 0){
                    right_html.push(getItem(notes[i]));
                  }else {
                    left_html.push(getItem(notes[i]));
                  }
               }

               $('.waterfall-content-right').append(left_html.join(''));
               $('.waterfall-content-left').append(right_html.join(''));

               setTimeout(function(){
                 $("img.lazy").lazyload({
                   effect : "fadeIn",
                   event : "scroll",
                   failurelimit : 20 // 图片排序混乱时
                 });
               },20)

               $('.box').on('click',function(e){
                  var id = $(this).data('id')
                  location.href="#/detail/" + id
               })
            }
        })
      },
      initWaterFall:function(l){

          this.getItems('/gethf');
          this.scrollAppend();



      },
      scrollAppend:function(){
        var that = this;
        $(window).on('scroll',function(){

          if(location.hash == '#/life/hf'){
            var scrollTop = $(window).scrollTop() + $(window).height();
            $leftLast =  $('.waterfall-content-left .box').last();
            $rightRast =  $('.waterfall-content-right .box').last();
            var $leftLastScroll = $leftLast.offset().top;
            var $rightLastScroll = $rightRast.offset().top;

            if(scrollTop > $leftLastScroll || scrollTop > $rightLastScroll){
                that.getItems('/gethf2');
            }

            if($(window).scrollTop() >= 51){
              $('#life-menu').addClass('fixed-menu')
            }else {
              $('#life-menu').removeClass('fixed-menu')
            }
          }

        })

      }
  }

  function getItem(data){
      var item =
          '<div class="box" data-id="'+data.id+'">\
            <img class="lazy" data-original="'+data.image+'" />\
            <div class="item-title"><h5>'+data.title+'</h5></div>\
            <div class="item-desc">'+data.desc+'</div>\
            <div class="item-auth">\
              <div class="avatar"><img class="lazy" data-original="'+data.user.image+'" /></div><span class="name">'+data.user.nickname+'</span><span class="likes">'+data.likes+'</span>\
            </div>\
          </div>'

      return item;
  }

  return hf;
})
