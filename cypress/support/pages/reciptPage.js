export class reciptPage {

    constructor () {
    
        this.nombre = '[id="name"]',
        this.producBS = '[id="Black T-Shirt"]',
        this.producWP = '[id="White Pants"]',
        this.creditcardnumber = '[id="creditCard"]',
        this.montogastado = '[id="totalPrice"]',
        this.thankyoubtn = 'Thank you'
      
    };

    verificarnombre () {
        return cy.get(this.nombre, {timeout:10000})
    };

    verificarproducto1 () {
        return cy.get(this.producBS, {timeout:10000})
    };

    verificarproducto2 () {
        return cy.get(this.producWP, {timeout:10000})
    };

    verificartarjeta () {
        return cy.get(this.creditcardnumber, {timeout:10000})
    };

    verificarmonto () {
        return cy.get(this.montogastado, {timeout:10000})
    };

    clickthankyoubtn () {
        cy.contains(this.thankyoubtn).click()
    };
};