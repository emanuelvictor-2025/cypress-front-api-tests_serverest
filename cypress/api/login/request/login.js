const API_URL = Cypress.env('API_URL')

Cypress.Commands.add('api_postLogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/login`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            "email": email,
            "password": password
        },failOnStatusCode: false
    })
})