var API_KEY = "sk_test_WnbLSCin9Ke5y1iT840uv1S8"
var APP_ID = "app_GOWrf1GerLi5arP0"

var pingpp = require('pingpp')(API_KEY);
var bodyParser = require('body-parser');
var createPayment = require('./payment.js');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
next();
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')
})
//
// app.get('/test',function(req,res){
//    res.sendFile(__dirname + '/test/baidu.html')
// });
//
// app.get('/gethf',function(req,res){
//     fs.readFile(__dirname + '/public/data/hb.json',function(err,data){
//         if(err){
//           console.log(err)
//         }else {
//           res.json(JSON.parse(data))
//         }
//     });
// });
//
// app.get('/gethf2',function(req,res){
//     fs.readFile(__dirname + '/public/data/hb2.json',function(err,data){
//         if(err){
//           console.log(err)
//         }else {
//           res.json(JSON.parse(data))
//         }
//     });
// });
//
// app.get('/getall',function(req,res){
//     fs.readFile(__dirname + '/public/data/all.json',function(err,data){
//         if(err){
//           console.log(err);
//         }else {
//           res.json(JSON.parse(data));
//         }
//     });
// });
// //
// app.get('/addgoods/:id',function(req,res){
//     var id = req.params.id;
//     var file = __dirname + '/public/data/cart.json';
//     fs.readFile(file,function(err,data){
//         if(err){
//           console.log(err);
//         }else {
//
//           data = JSON.parse(data.toString());
//           if(data.cart[id]){
//             var num = data.cart[id];
//             num = parseInt(num);
//             data.cart[id]  = ++num;
//           }else {
//             data.cart[id]  = 1;
//           }
//           data = JSON.stringify(data);
//           fs.writeFile(file,data,function(err){
//               if(err){
//                 console.log(err);
//               }else {
//                 res.json({msg:'success'});
//               }
//           });
//         }
//     });
//
// });
//
// app.get('/getcartdata',function(req,res){
//
//     fs.readFile(__dirname + '/public/data/cart.json',function(err,cartdata){
//           if(err){
//             console.log(err);
//           }else {
//             var carts = JSON.parse(cartdata.toString()).cart;
//             console.log('carts:'+ carts);
//             fs.readFile(__dirname + '/public/data/all.json',function(err,adata){
//                 if(err){
//                   console.log(err);
//                 }else {
//
//                   var alldata = JSON.parse(adata.toString()).data;
//                   var resarr = [];
//                   for(var i in carts){
//                       // console.log(i)
//                       for(var j = 0;j < alldata.length;j++){
//                           var td = alldata[j];
//                           if(td.id == i){
//                             // console.log('===');
//                               td.number = carts[i];
//                               resarr.push(td);
//                           }
//                       }
//                   }
//
//                   res.json({data:resarr})
//                 }
//             })
//
//           }
//     })
//
// });
//
// app.get('/removegoods',function(req,res){
//     var id = req.params.id;
//     console.log('id:' + id);
//     fs.readFile(__dirname + '/public/data/cart.json',function(err,data){
//
//         if(err){
//           console.log(err);
//         }else{
//           var json = JSON.parse(data.toString());
//           delete json.cart[id];
//           res.json({msg:'success'});
//         }
//     });
// });
//

// app.get('/success',function(req,res){
//
//      var result = req.query.result;
//      var out_trade_no = req.query.out_trade_no;
//      if(result == 'success'){
//        res.sendFile(__dirname + '/success.html')
//      }else{
//        res.redirect('/fail');
//      }
//
// });

// app.get('/cancel',function(req,res){
//     console.log('cancel..')
//      res.sendFile(__dirname + '/index.html')
// });

app.listen(8888,function(){
  console.log('server start @ 8888')
})
