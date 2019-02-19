const puppeteer = require('puppeteer')

const scrape = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto('http://legendas.tv/')
  await page.waitFor('.bigtitle')

  const result = await page.evaluate(() => {
    return document.querySelector('.bigtitle').innerText
  })

  await browser.close()

  return result
}

scrape()
  .then((result) => {
    console.log(result)
  })
