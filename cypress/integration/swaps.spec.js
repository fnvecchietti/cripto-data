
/*

PARA CONFIGURAR VAS A LOS ARRAY DE LOS TOKENS SEGUN EL SWAP

AGREGAS UN NUEVO OBJETO COMO ESTE 

{
    name: 'El nombre del token'
    contract: 'El contrato del token',
    quantity: 'la cantidad de tokens que tenes',
    base: 'la cantidad de USDT/BUSD/USDC que invertiste'
}

dejo ejemplos abajo con algunos tokens.

*/


const DATA = { data: [] }

describe('Go to pancakeSwap', () => {
    let tokens = [
        {
            name: 'Banana',
            contract: '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95',
            quantity: 62.66,
            base: 136
        }
    ]
    tokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValueFromPancake(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.writeFile('./data.json', DATA)
    })

})

describe('Go to Quickswap', () => {
    let polygonTokens = [
        {
            name: 'PolyDoge',
            contract: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
            quantity: 3545328175,
            base: 46
        }
    ]
    polygonTokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValueFromQuickSwap(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.readFile('./data.json').then(obj => {
            const result = DATA.data.concat(obj.data)
            cy.writeFile('./data.json', result)
        })
    })
})

describe('Go to Heco Swap', () => {
    let hecoTokens = [
        {
            name: 'SHIB',
            contract: '0xC38072AA3F8E049De541223A9c9772132bB48634',
            quantity: 8416062,
            base: 139
        }
    ]
    hecoTokens.forEach(async (token) => {
        await it(`Get ${token.name} value`, async () => {
            let result = await getBuyValuesFromHtSwap(token.contract, token.name, token.quantity, token.base)
            DATA.data.push(result)
        })
    })
    it('Save files', () => {
        cy.readFile('./data.json').then(obj => {
            const result = obj.concat(DATA.data)
            cy.writeFile('./data.json', { data: result })
        })
    })
})

function getBuyValueFromPancake(contract, name, quantity, base) {
    return new Promise((resolve, reject) => {
        cy.visit(`https://exchange.pancakeswap.finance/#/swap?inputCurrency=${contract}&outputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56`)
        cy.wait(2000)
        if (cy.get('reach-portal')) {
            cy.wait(500)
            cy.get('input[name="confirmed"').click()
            cy.wait(500)
            cy.get('button').contains('Import').click()
            cy.wait(500)
        }
        // cy.get('#swap-currency-output').find('#pair').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('busd')
        // cy.wait(2000)
        // cy.get('[title="BUSD Token"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}

function getBuyValueFromQuickSwap(contract, name, quantity, base) {

    return new Promise((resolve, reject) => {
        cy.visit(`https://quickswap.exchange/#/swap?inputCurrency=${contract}&outputCurrency=0xc2132D05D31c914a87C6611C10748AEb04B58e8F`)
        cy.wait(2500)
        if (cy.get('.token-warning-container')) {
            cy.wait(1500)
            cy.get('.understand-checkbox').click()
            cy.wait(1500)
            cy.get('.token-dismiss-button').click()
            cy.wait(1500)
        }
        // cy.get('#swap-currency-output').find('.open-currency-select-button').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('usdt')
        // cy.wait(2000)
        // cy.get('[title="Tether USD"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}

function getBuyValuesFromHtSwap(contract, name, quantity, base) {
    return new Promise((resolve, reject) => {
        cy.visit(`https://ht.mdex.com/#/swap?inputCurrency=${contract}&outputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a`)
        cy.wait(2500)
        if (cy.get('.token-warning-container')) {
            cy.wait(1500)
            cy.get('.understand-checkbox').click()
            cy.wait(1500)
            cy.get('.token-dismiss-button').click()
            cy.wait(1500)
        }
        // cy.get('#swap-currency-output').find('.open-currency-select-button').click()
        // cy.wait(1500)
        // cy.get('#token-search-input').type('usdt')
        // cy.wait(2000)
        // cy.get('[title="Tether USD"]').click()
        cy.wait(500)
        cy.get('.token-amount-input').first().type(`${quantity}`)
        cy.wait(2500)
        cy.get('#swap-currency-output').find('.token-amount-input').then((outputToken) => {
            let status = outputToken[0].value - base
            console.log(status);
            resolve({
                name: name,
                value: outputToken[0].value,
                status
            })
        })
    })
}
