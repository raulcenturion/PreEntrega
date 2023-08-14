/// <reference types="cypress" />
///Entrega Final


import { ProductsPage } from "../../support/pages/productsPage";
import { ShoppingCartPage } from "../../support/pages/shoppingCartPage";
import { Checkoutpage } from "../support/Pages/checkoutPage";
import { reciptPage } from "../support/Pages/reciptPage";
import { MENSAJES_ERROR } from "../support/constantes";


describe('PreEntrega Challenge', () => {
    //inicializa el fixture
    let datosFixUs;
    let datosFixProd;
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkout = new Checkoutpage(); 
    const reciptpage = new ReciptPage();

    before('Before', () => {
        cy.fixture('datoUsuario').then((dUsuario) => {
            datosFixUs = dUsuario;
        })
        cy.fixture('datoProducto').then((dProducto) => {
            datosFixProd = dProducto;
        })
    })

    beforeEach('Preconditions', () => {
      
        cy.visit('/')
        cy.RegistroAPI(Cypress.env('usuario'), Cypress.env('contraseña'),'Male','28','Agosto','1987'); 
        cy.Login(Cypress.env('usuario'),Cypress.env('contraseña'));
    });
    
    it('Ir a Online Shop, agregar 2 productos, verificar precio + nombre y total acumulado', () => {
        productsPage.agregarProducto(datosFixProd.BlackJacket.nombre);
        cy.get('#closeModal').click();
        productsPage.agregarProducto(datosFixProd.WhiteShoes.nombre);
        cy.xpath(`//*[@id="closeModal"]`).click();
        cy.xpath(`//*[@id="goShoppingCart"]`).click();
        shoppingCartPage.verificarProducto(datosFixProd.BlackJacket.nombre).should('have.text', datosFixProd.BlackJacket.nombre);
        shoppingCartPage.verificarProducto(datosFixProd.WhiteShoes.nombre).should('have.text', datosFixProd.WhiteShoes.nombre);
        shoppingCartPage.verificarPrecio(datosFixProd.BlackJacket.nombre).should('have.text', `$${datosFixProd.BlackJacket.precio}`);
        shoppingCartPage.verificarPrecio(datosFixProd.WhiteShoes.nombre).should('have.text', `$${datosFixProd.WhiteShoes.precio}`);
        cy.xpath(`//button[@type="button"and@class="chakra-button css-15tuzzq"]`).click();
        cy.get('#price').should('have.text', datosFixProd.BlackJacket.precio + datosFixProd.WhiteShoes.precio);
        checkout.escribirFirstName(data.checkout.nombre); 
        checkout.escribirLastName(data.checkout.apellido); 
        checkout.escribirCardNumber(data.checkout.cardnumber); 
        checkout.clickpurchase(); 
        reciptpage.verificarnombre().should('have.text', MENSAJES_ERROR.PURCHASE_NAME);
        reciptpage.verificarproducto1().should('have.text',data.productos.BlackTShirt);
        reciptpage.verificarproducto2().should('have.text',data.productos.WhitePants);
        reciptpage.verificartarjeta().should('have.text',data.checkout.cardnumber);
        reciptpage.verificarmonto().should('have.text',MENSAJES_ERROR.PURCHASE_SPENT+` $${data.precios.BlackTShirt+data.precios.WhitePants}`);
        reciptpage.clickthankyoubtn()
    });
    after('Borrando el usuario creado mediante API', () => {
      cy.Deleteuser(Cypress.env('usuario'));
  });
});