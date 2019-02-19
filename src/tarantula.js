const fs = require('fs')
const puppeteer = require('puppeteer')

const scrape = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  console.log('Open browser...')
  await page.goto('http://legendas.tv/')
  console.log('Entering in site...')
  await page.waitFor('.bigtitle')

  console.log('Scraping data...')
  const result = await page.evaluate(() => {
    return document.querySelector('.bigtitle').innerText
  })

  console.log('Closing browser...')
  await browser.close()

  return result
}

scrape()
  .then((result) => {
    console.log('Saving data...')
    fs.appendFile('simpsons-subtitle.txt', result, (err) => {
      if(err) console.log(err)
    })
  })
