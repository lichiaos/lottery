const puppeteer = require('puppeteer')
const request = require('superagent')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()
const url = 'http://www.175198.com/lotteryV3/lotDetail.do?lotCode=TEQ28'
const lotCode = 'TEQ28'
const headers = {
  "Host": " www.175198.com",
  "User-Agent": " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
  "Referer": "http://www.175198.com/lotteryV3/lotDetail.do?lotCode=TEQ28",
  "Cookie": " SESSION=51e6f063-6166-411d-82be-3e07b4020f53"
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

function getNum(qiHao) {
  request.get('http://www.175198.com/lotteryV3/lotLast.do')
    .set(headers)
    .query({
      qiHao,
      lotCode
    })
    .end((err, res) => {
      if (err) throw new Error(err)
      console.log(res)
    })
}
app.use(bodyParser())
app.use(cors())

router.post('/getNum', async (ctx, next) => {
  console.log('请求参数', ctx.request.body)
  request.post('http://216728.com/lottery/trendChart/lotteryOpenNum.do')
    .set(AllNumHeaders)
    .send(ctx.request.body)
    .end((err, res) => {
      console.log(res.body)
      if (err) throw new Error(err)
      ctx.response.body = res.body
    })
});
app.use(router.routes());

// ;(fn = async () => {
//   const browser = await (puppeteer.launch({
//     timeout: 15000,
//     ignoreHTTPSErrors: true,
//     // 打开开发者工具, 当此值为true时, headless总为false
//     devtools: false,
//     // 关闭headless模式, 不会打开浏览器
//     headless: true,
//     executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
//   }))
//   const page = await browser.newPage()
//   await page.goto(url)
//   const last_qihao = await page.$eval('#last_qihao', el => el.innerText)
//   if (typeof +last_qihao === 'number') {
//     console.log('进入了定时器')
//     setInterval(() => {
//       getNum(`${+new Date().getFullYear()}${last_qihao}` )
//     }, 3000)
//     await browser.close()
//   } else {
//     console.log('重新请求')
//     fn()
//   }
// })()

app.listen(3000, () => {
  console.log('服务已开启')
})