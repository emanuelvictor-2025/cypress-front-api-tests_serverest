import faker from 'faker';

const postUsers = require('./request/userRegistration')

describe('POST User', () => {
    it('able to register users with success', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm ='false'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })

    })

    it('able to register admin user with success', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })
    })
})

context('Erros', () => {
    it('not able to register with user already registered', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(201)

            cy.api_postUsers(name, email, password, adm).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.contain('Este email já está sendo usado')
            })
        })
    })

    it('not able to register with invalid email', () => {
        const name = faker.name.findName()
        const email = 'batata@batata'
        const password = faker.internet.password()
        const adm = 'true'

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('not able to register with mandatory fields empty', () => {
        const name = ''
        const email = ''
        const password = ''
        const adm = ''

        cy.api_postUsers(name, email, password, adm).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.all.keys('nome', 'email', 'password', 'administrador');
            expect(response.body).to.deep.include({
                nome: 'nome não pode ficar em branco',
                email: 'email não pode ficar em branco',
                password: 'password não pode ficar em branco',
                administrador: "administrador deve ser 'true' ou 'false'"
            })
        })
    })
})