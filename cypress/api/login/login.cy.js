import faker from 'faker';

const postLogin = require('./request/login')
const postUsers = require('../users/request/userRegistration')


describe('POST Login', () => {
    let email, password

    before('Register user', function () {
        const name = faker.name.findName()
        email = faker.internet.email()
        password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
    it('Perform a Successful Login', () => {
        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Login realizado com sucesso')
            expect(response.body.authorization).to.be.not.null
        })
    })
})

context('Erros', () => {
    it('not able to login with invalid email', () => {
        const email = 'batata@batata'
        const password = faker.internet.password()

        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('not able to login with inexistent user', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Email e/ou senha inválidos')
        })
    })
})