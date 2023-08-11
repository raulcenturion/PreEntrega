export class LoginPage {

    constructor() {
        this.ingresarApp = '#registertoggle';
        this.usuarioInput = '#user';
        this.contraseñaInput = '#pass';
        this.submitForm = '#submitForm';
        this.onlineShop = '#onlineshoplink'
    }
    iniciaSesion() {
        cy.get(this.ingresarApp).dblclick();
     };

    escribirUsuario(text) {
       return cy.get(this.usuarioInput);
    };

    escribirContraseña(text) {
       return cy.get(this.contraseñaInput);
    };

    enviarFormulario() {
        cy.get(this.submitForm).click();
    };
    
    ingresarShop() { 
        cy.get(this.onlineShop).click();
    };
};