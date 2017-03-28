var crypto = require('crypto');
var API_KEY = "sk_test_WnbLSCin9Ke5y1iT840uv1S8"
var APP_ID = "app_GOWrf1GerLi5arP0"


var pingpp = require('pingpp')(API_KEY);
var createPayment = function(channel, amount, client_ip, open_id, cb){
  // 以下 channel 仅为部分需要 extra 参数的示例，详见 https://www.pingxx.com/document/api#api-c-new
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        // success_url 和 cancel_url 在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数
        'success_url': 'http://127.0.0.1:3002/success',
        'cancel_url': 'http://127.0.0.1:3002/cancel'
      };
      break;
    case 'upacp_wap':
      extra = {
        'result_url': 'http://127.0.0.1:3002/success'// 银联同步回调地址
      };
      break;
    case 'bfb_wap':
      extra = {
        'bfb_login': true,// 是否需要登录百度钱包来进行支付
        'result_url': 'http://127.0.0.1:3002/success'// 百度钱包同步回调地址
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': open_id// 用户在商户微信公众号下的唯一标识，获取方式可参考 wxPubOauth.js
      };
      break;
  }
  // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
  var order_no = crypto.createHash('md5')
                .update(new Date().getTime().toString())
                .digest('hex').substr(0, 12);
  pingpp.charges.create({
    order_no:  order_no,// 推荐使用 8-20 位，要求数字或字母，不允许其他字符
    app:       {id: APP_ID},
    channel:   channel,// 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
    amount:    amount,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
    client_ip: client_ip,// 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
    currency:  "cny",
    subject:   "Charge Subject",
    body:      "Charge Body",
    extra:     extra
  }, cb);
};

module.exports = createPayment;
