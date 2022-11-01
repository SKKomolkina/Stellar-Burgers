import {
    addBun,
    addIngredient,
    body,
    bun,
    ingredient,
    modal,
    sauce,
    takeOrder
} from "../../../src/services/constants/tests";
import {baseUrl} from "../../../src/utils/urls";

describe('burger constructor works correctly', () => {
    before(() => {
        cy.visit('/');
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
        cy.visit('/');
    })

    it('should the modal works', () => {
        cy.wait(3000);

        // cy.intercept('GET', 'http://localhost:3000/', 'example.json')
        cy.get('p').contains(`${bun}`).click();
        cy.get(`${modal}`).should('exist');
        cy.get('h2').contains('Детали ингредиента').should('exist');
        cy.get(`${body}`).type('{esc}');
        cy.get(`${modal}`).should('not.exist');
    })
})

describe('remove ingredients from burger constuctor', () => {
    before(() => {
        cy.visit('/');
    })

    it('should the ingredient remove', () => {
        cy.wait(3000);

        //
        cy.get('p').contains(`${bun}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addBun}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains(`${sauce}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addIngredient}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('span').contains(`${sauce}`).should('exist');
        cy.get('span').contains(`${sauce}`).parent().find('svg').last().click();
        cy.get('p').contains(`${addIngredient}`).should('exist');
    })
})

describe('drag and drop', () => {
    before(() => {
        cy.visit('/');
    })

    it('should the drag and drop works', () => {
        cy.viewport('macbook-13');
        cy.clearCookie('accessToken');
        cy.clearLocalStorage('refreshToken');
        cy.wait(3000);

        //
        cy.get('p').contains(`${bun}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addBun}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains(`${ingredient}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addIngredient}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('button').contains(`${takeOrder}`).click();

        //
        cy.get('h1').contains('Вход');
        cy.intercept(`${baseUrl}/auth/user`).as('auth');
        cy.get('input[type=email]').type('1234@yandex.ru');
        cy.get('input[type=password]').type('12345{enter}');
        cy.wait(3000);

        //
        cy.get('button').contains(`${takeOrder}`).click();

        //
        cy.intercept(`${baseUrl}/orders`).as("order");
        cy.wait(12000);

        //
        cy.wait(3000);
        cy.get(`${modal}`).should('exist');
        cy.get(`${body}`).type('{esc}');
        cy.wait(3000);
        cy.get(`${modal}`).should('not.exist');
    })
})

describe('dragging items', () => {
    before(() => {
        cy.visit('/');
    })

    it('should dragging items in container works correctly', () => {
        cy.viewport('macbook-13');
        cy.wait(2000);

        //
        cy.get('p').contains(`${bun}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addBun}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains(`${ingredient}`)
            .trigger('dragstart').trigger('dragleave');
        cy.get('p').contains(`${addIngredient}`)
            .trigger('dragenter').trigger('dragover').trigger('drop');

        //
        cy.get('p').contains(`${sauce}`)
            .trigger('dragstart').trigger('dragleave');

        cy.get('span').contains(`${ingredient}`)
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop');

        cy.get('span').contains(`${sauce}`)
            .trigger('dragstart')
            .trigger('dragleave')

        cy.get('span').contains(`${ingredient}`)
            .trigger('dragenter')
            .trigger('dragover', 'bottomRight')
            .trigger('drop', 'bottomRight');
        cy.wait(3000);

        cy.get('span').contains(`${sauce}`)
            .trigger('dragstart')
            .trigger('dragleave')

        cy.get('span').contains(`${ingredient}`)
            .trigger('dragenter')
            .trigger('dragover', 'topRight')
            .trigger('drop', 'topRight');
    })
})
