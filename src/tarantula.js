const creds = require('../creds')
const fs = require('fs')
const puppeteer = require('puppeteer')

async function run() {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('http://legendas.tv/login')

  console.log('Entering in site...')
  await page.screenshot({ path: '../screens/enter.png'})

  await page.type('#UserUsername', creds.username)
  await page.type('#UserPassword', creds.password)
  await page.click('#UserLoginForm > button')

  console.log('Loging...')
  await page.screenshot({ path: '../screens/login.png'})

  browser.close()
}

run()
