define(['src/myroute.js'],function(router){

  router
  .addRoute('#/life/hf', function(req,next){

     require(['src/pages/life/hf/hf.js'],function(hf){
        hf.add();
        hf.initWaterFall();
     })
  })
  .addRoute('#/life/cz', function(req,next){

     require(['src/pages/life/cz/cz.js'],function(cz){
        cz.add();
     })
  })
})
