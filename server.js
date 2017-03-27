var express = require('express');
var fs =require('fs');
var app = express();
app.use(express.static('./'));

app.get('/',function(req,res){
   res.sendFile(__dirname + '/index.html')
})

app.get('/test',function(req,res){
   res.sendFile(__dirname + '/test/baidu.html')
})

app.get('/gethf',function(req,res){
    fs.readFile(__dirname + '/public/data/hb.json',function(err,data){
        if(err){
          console.log(err)
        }else {
          res.json(JSON.parse(data))
        }
    })
})

app.get('/gethf2',function(req,res){
    fs.readFile(__dirname + '/public/data/hb2.json',function(err,data){
        if(err){
          console.log(err)
        }else {
          res.json(JSON.parse(data))
        }
    })
})

app.get('/getall',function(req,res){
    fs.readFile(__dirname + '/public/data/all.json',function(err,data){
        if(err){
          console.log(err)
        }else {
          res.json(JSON.parse(data))
        }
    })
})

app.get('/addgoods/:id',function(req,res){
    var id = req.params.id;
    var file = __dirname + '/public/data/cart.json';
    fs.readFile(file,function(err,data){
        if(err){
          console.log(err)
        }else {

          var data = JSON.parse(data.toString());
          if(data.cart[id]){
            var num = data.cart[id];
            num = parseInt(num);
            data.cart[id]  = ++num;
          }else {
            data.cart[id]  = 1;
          }
          data = JSON.stringify(data);
          fs.writeFile(file,data,function(err){
              if(err){
                console.log(err)
              }else {
                res.json({msg:'success'})
              }
          })
        }
    })

})

app.get('/getcartdata',function(req,res){

    fs.readFile(__dirname + '/public/data/cart.json',function(err,cartdata){
          if(err){
            console.log(err)
          }else {
            var carts = JSON.parse(cartdata.toString()).cart;
            console.log('carts:'+ carts)
            fs.readFile(__dirname + '/public/data/all.json',function(err,adata){
                if(err){
                  console.log(err)
                }else {

                  var alldata = JSON.parse(adata.toString()).data;
                  var resarr = [];
                  for(var i in carts){
                      console.log(i)
                      for(var j = 0;j < alldata.length;j++){
                          var td = alldata[j];
                          if(td.id == i){
                            console.log('===')
                              td.number = carts[i];
                              resarr.push(td);
                          }
                      }
                  }

                  res.json({data:resarr})
                }
            })

          }
    })

})

app.get('/removegoods',function(req,res){
    var id = req.params.id;
    fs.readFile(__dirname + '/public/data/cart.json',function(err,data){

        if(err){
          console.log(err)
        }else{
          var json = JSON.parse(data.toString());
          delete json.cart[id];
          res.json({msg:'success'})
        }
    })
})
app.listen('3002',function(){
  console.log('server start...')
})
