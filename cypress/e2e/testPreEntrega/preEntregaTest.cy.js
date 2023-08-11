/// <reference types="cypress" />

import { LoginPage } from "../../support/pages/loginPage";
import { ProductsPage } from "../../support/pages/productsPage";
import { ShoppingCartPage } from "../../support/pages/shoppingCartPage";


describe('PreEntrega Challenge', () => {
    //inicializa el fixture
    let datosFixUs;
    let datosFixProd;
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();

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
        loginPage.iniciaSesion();
        loginPage.escribirUsuario().type(datosFixUs.usuario.user);
        loginPage.escribirContraseña().type(datosFixUs.usuario.pass); 
        loginPage.enviarFormulario();
        loginPage.ingresarShop();
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
    });
});