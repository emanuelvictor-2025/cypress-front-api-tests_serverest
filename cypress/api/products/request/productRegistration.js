const API_URL = Cypress.env('API_URL')

Cypress.Commands.add('api_postProducts', (product_name, price, description, qtd, jwt) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/produtos`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: jwt
        },
        body: {
            "nome": product_name,
            "preco": price,
            "descricao": description,
            "quantidade": qtd
        }, failOnStatusCode: false
    })
})