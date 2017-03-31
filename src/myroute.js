define(['Router'],function(Router){

    var router = new Router()

    .route('#/life', function(req, next){

        require(['src/pages/life/life.js'],function(life){
            life.add();
            life.initMenu();
            location.href = '#/life/hf';
        });
    })
    .route('#/direction', function(req, next){
        require(['src/pages/direction/direction.js'],function(direction){
            direction.add();
        });
    })
    .route('#/brand', function(req, next){
        require(['src/pages/brand/brand.js'],function(brand){
            brand.add();
        });
    })
    .route('#/buy', function(req, next){
        require(['src/pages/buy/buy.js'],function(life){
            life.add();
            life.initMenu();
            location.href = '#/buy/all'
        });
    })
    .route('#/detail/:id', function(req, next){
        var id = req.params.id;
        // console.log('id>>' + id)
        require(['src/pages/detail/detail.js'],function(detail){
            detail.add(id);
        });
    })
    .route('#/goods/:id', function(req, next){
      console.log('good....')
        var id = req.params.id;
        require(['src/pages/goods/goods.js'],function(goods){
            goods.add(id);
        });
    })
    .route('#/cart',function(req,next){
    //   console.log('cart....')
        require(['src/pages/cart/cart.js'],function(cart){
            // console.log('------')
            cart.init();
        });
    })

    .route('#/order',function(req,next){
        require(['src/pages/order/order.js'],function(om){
            om.init();
        });
    })

    return router;
});
