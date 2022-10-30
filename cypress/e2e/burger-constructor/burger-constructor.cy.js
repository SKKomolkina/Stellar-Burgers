describe('burger constructor works correctly', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    })

    it('should correctly the page open', () => {
        cy.contains('Соберите бургер');
        cy.contains('Булки');
        cy.contains('Соусы');
        cy.contains('Начинки');
    })
})

describe('open modal correctly', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    })

    it('should the modal works', () => {
        cy.wait(3000);

        // cy.intercept('GET', 'http://localhost:3000/', 'example.json')
        cy.get('p').contains('Флюоресцентная булка R2-D3').click();
        cy.get('#Modal').should('exist');
        cy.get('h2').contains('Детали ингредиента').should('exist');
        cy.get('body').type('{esc}');
        cy.get('#Modal').should('not.exist');
    })
})

describe('remove ingredients from burger constuctor', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    })

    it('should the ingredient remove', () => {
        cy.wait(3000);

        //
        cy.get('p').contains('Флюоресцентная булка R2-D3')
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains('Выберите булку')
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains('Соус фирменный Space Sauce')
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains('Добавьте ингредиент')
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('span').contains('Соус фирменный Space Sauce').should('exist');
        cy.get('span').contains('Соус фирменный Space Sauce').parent().find('svg').last().click();
        cy.get('p').contains('Добавьте ингредиент').should('exist');
    })
})

describe('drag and drop', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    })

    it('should the drag and drop works', () => {
        cy.clearCookie('accessToken');
        cy.clearLocalStorage('refreshToken');
        cy.wait(3000);

        //
        cy.get('p').contains('Флюоресцентная булка R2-D3')
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains('Выберите булку')
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains('Соус фирменный Space Sauce')
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains('Добавьте ингредиент')
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('button').contains('Оформить заказ').click();

        //
        cy.get('h1').contains('Вход');
        cy.intercept('https://norma.nomoreparties.space/api/auth/user').as('auth');
        cy.get('input[type=email]').type('1234@yandex.ru');
        cy.get('input[type=password]').type('12345{enter}');
        cy.wait(3000);

        //
        cy.get('button').contains('Оформить заказ').click();

        //
        cy.intercept("https://norma.nomoreparties.space/api/orders").as("order");
        cy.wait(12000);

        //
        cy.wait(3000);
        cy.get('#Modal').should('exist');
        cy.get('body').type('{esc}');
        cy.get('#Modal').should('not.exist');
    })
})
