
const API_URL = Cypress.env('API_URL')

Cypress.Commands.add('api_postUsers', (name, email, password, adm) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/usuarios`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            "nome": name,
            "email": email,
            "password": password,
            "administrador": adm
        }, failOnStatusCode: false
    })
})
