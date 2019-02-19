const fs = require('fs')
const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('http://legendas.tv/login')
  await page.screenshot({ path: 'login.png'})
  browser.close()
}

run()
