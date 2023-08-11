export class ShoppingCartPage {

    constructor () {
        this.nombreProducto = '#productName'
        this.productprice = '#productPrice'
        
    };

    verificarProducto (producto) {
        return cy.contains(producto)  
    };

    verificarPrecio (producto) {
        return cy.contains(this.nombreProducto, producto).siblings(this.productprice)
    };
 
    
};