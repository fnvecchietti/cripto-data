const so = require('fs')
const cypress = require('cypress')

async function run() {
    await cypress.run({
        browser: 'chrome',
        config: {
            video: false
        },
        headless: true
    })
    let rawdata = await so.readFileSync('./data.json')
    let data = await JSON.parse(rawdata)
    return data
}

run().then(res => {
    console.log(res);
})


