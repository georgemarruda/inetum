const { fake } = require('faker');
const faker = require('faker')

describe('Desafio Inetum', () => {

    const credential = {
        user: 'Lea Bednar',
        email: 'lindsay_runolfsson@gmail.com',
        password: '12345'
    }

    const usuario = {
        email: faker.internet.email().toLowerCase(),
        nome: faker.name.firstName(),
        ultimoNome: faker.name.lastName(),
        senha: faker.lorem.words(),
        endereco: faker.address.streetName(),
        cidade: faker.address.city(),
        estado: faker.address.state(),
        zipCode: faker.random.number({min: 10000, max: 50000}),
        mobile: faker.phone.phoneNumberFormat(3),
        obs: faker.lorem.sentence(2)
    }

    const produto = {
        t_shirt: 'Faded Short Sleeve T-shirts',
        dress: 'Printed Summer Dress'
    }

    beforeEach(() => {
        cy.visit('/index.php')
    });

    it('Registo de Utilizador.', () => {
        cy.cadastraNovoUsuario(usuario)
        cy.contains('Welcome to your account. Here you can manage all of your personal information and orders.')
    });

    it.only('Adicionar produto ao carrinho, avançando até ao step de pagamento.', () => {
        cy.login(credential)
        cy.adicionaProduto(produto.t_shirt)
        cy.checkout()
        cy.contains('Please choose your payment method')
    });

    it('Pesquisa Produto', () => {
        cy.pesquisa(produto)
    });

    it('Efetuar Login.', () => {
        cy.login(credential)
        cy.contains(credential.user)
    });

    it('Adicionar mais que um produto ao carrinho de diferentes categorias', () => {
        cy.login(credential)
        cy.adicionaProduto(produto.t_shirt)
        cy.continuarComprando()
        cy.adicionaProduto(produto.dress)
        cy.checkout()
        cy.contains('Please choose your payment method')
    });

    it('Finalizar uma encomenda', () => {
        cy.login(credential)
        cy.adicionaProduto(produto.t_shirt)
        cy.checkout()
        cy.efetuaPagamento('cheque')
        cy.contains('Your order on My Store is complete.')
    });
});