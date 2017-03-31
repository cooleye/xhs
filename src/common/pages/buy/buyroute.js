define(['src/myroute.js'],function(router){

  router
  .addRoute('#/buy/all', function(req,next){

     require(['src/pages/buy/all/all.js'],function(all){
        all.add();
        // all.initWaterFall();
     })
  })
  .addRoute('#/buy/hf', function(req,next){

     require(['src/pages/buy/hf/hf.js'],function(hf){
        hf.add();
     })
  })
})
