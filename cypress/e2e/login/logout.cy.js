import '../../support/commands'
import faker from 'faker';

const baseUrl = Cypress.config('baseUrl')
const postUsers = require('../../api/users/request/userRegistration')

beforeEach(() => {
    cy.visit('/')

})

describe('Logout', () => {
    it('able to logout successfuly', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.login(email, password)

        cy.logout()
        cy.url().should('be.equal', `${baseUrl}/login`)
    })
})