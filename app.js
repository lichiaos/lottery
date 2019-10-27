const request = require('superagent')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const lotCode = 'TEQ28'

function commonResult(code, msg, data) {
  return {
    code,
    msg,
    data
  }
}

const AllNumHeaders = {
  "Host": "216728.com",
  "Origin": "http://216728.com",
  "Connection": " keep-alive",
  "Accept": " application/json, text/javascript, */*; q=0.01",
  "X-Requested-With": " XMLHttpRequest",
  "User-Agent": " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
  "Referer": "http://216728.com/lottery/trendChart/index.do?lotCode=TEQ28",
  "Accept-Encoding": " gzip, deflate",
  "Accept-Language": " zh-CN,zh;q=0.9",
  "Cookie": "SESSION=1e60ec7d-b548-4aed-8f2d-e2a4c2cc4beb"
}

app.use(bodyParser())
app.use(cors())

router.post('/getNum', async (ctx, next) => {
  try {
    let result = await request.post('http://216728.com/lottery/trendChart/lotteryOpenNum.do')
        .set(AllNumHeaders)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(ctx.request.body)
    ctx.body = commonResult(200, 'success', result.body)
  } catch (e) {
    ctx.body = commonResult(500, e, null)
  }
});
app.use(router.routes());

app.listen(3000, () => {
  console.log('server has launched on port 3000')
})
