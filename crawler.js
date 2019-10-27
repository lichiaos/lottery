const puppeteer = require('puppeteer')
const request = require('superagent')
const url = 'http://www.175198.com/lotteryV3/lotDetail.do?lotCode=TEQ28'
const lotCode = 'TEQ28'
const queryTimeout = 10000
let orderQihao = ''
let timeId
const headers = {
  "Host": " www.175198.com",
  "Connection": " keep-alive",
  "Accept": " application/json, text/javascript, */*; q=0.01",
  "X-Requested-With": " XMLHttpRequest",
  "User-Agent": " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
  "Referer": "http://www.175198.com/lotteryV3/lotDetail.do?lotCode=TEQ28",
  "Accept-Encoding": " gzip, deflate",
  "Accept-Language": " zh-CN,zh;q=0.9",
  "Cookie": " SESSION=51e6f063-6166-411d-82be-3e07b4020f53"
}

function handlerOrder(haoMa) {
  console.log('当前中奖号码为' + haoMa)
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
        const response = JSON.parse(res.text)
        console.log(response)
        if (response.success) {
          handlerOrder(response.last.haoMa)
          setTimeout(() => {
            getNum(orderQihao = +response.last.qiHao + 1)
            console.log('下一期请求期号:' + orderQihao)
          }, queryTimeout)
        } else {
          timeId = setTimeout(() => {
            getNum(qiHao)
          }, queryTimeout)
        }
      })
}

;(fn = async () => {
  const browser = await (puppeteer.launch({
    timeout: 15000,
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }))
  const page = await browser.newPage()
  await page.goto(url)
  const last_qihao = await page.$eval('#last_qihao', el => el.innerText)
  if (typeof +last_qihao === 'number') {
    const currentQihao = `${+new Date().getFullYear()}${+last_qihao}`
    console.log('页面获取期号为:' + currentQihao)
    getNum(currentQihao )
    await browser.close()
  } else {
    console.log('重新请求')
    fn()
  }
})()
