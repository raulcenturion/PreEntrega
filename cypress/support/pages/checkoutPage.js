export class Checkoutpage {

    constructor () {
    this.firstName = '#FirstName',
    this.lastName = '#lastName',
    this.cardNumber = '#cardNumber',
    this.purchase = '[class="chakra-button css-13zsa"]'
    };


escribirFirstName (nombre) {
    cy.get(this.firstName).type(nombre)
    };

escribirLastName (apellido) {
    cy.get(this.lastName).type(apellido)
    };

escribirCardNumber (numerodetarjeta) {
    cy.get(this.cardNumber).type(numerodetarjeta)
    };

clickpurchase () {
    cy.get(this.purchase).click()
    };
};