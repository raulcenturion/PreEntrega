export class ProductsPage {

    constructor () {

        this.button = 'button'
          
    };

    agregarProducto (producto) {
        cy.contains(producto).siblings(this.button).click()
    };

};