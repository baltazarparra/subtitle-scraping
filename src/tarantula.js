const fs = require('fs')
const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('http://legendas.tv/login')

  console.log('Entering in site...')
  await page.screenshot({ path: 'enter.png'})

  await page.type('#UserUsername', 'fliperapp')
  await page.type('#UserPassword', '123456')
  await page.click('#UserLoginForm > button')

  console.log('Loging...')
  await page.screenshot({ path: 'login.png'})

  browser.close()
}

run()
