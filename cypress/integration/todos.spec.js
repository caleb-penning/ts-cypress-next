/// <reference types="Cypress" />

describe("Todos Page", () => {
    it("Should have two todos by default", () => {
        // arrange
        cy.visit("/todos")

        // act
        cy.get("li").as("todos")

        // assert
        cy.get("@todos").should("have.length", 2)
    })

    it("Should post a new todo upon submission", () => {
        // arrange
        cy.visit("/todos")

        // act
        cy
          .get("input[type*='text']")
          .as("input")
        cy
          .get("@input")
          .type("walk the dog")
        cy
          .get("input[type*='submit']")
          .as("submit")

        cy
          .get("@submit")
          .click()
        
        // assert
        cy.get("li").should("have.length.above", 2)
    })

    it("Should get rid of it's respective todo when the remove button is clicked", () => {
        // arrange
        cy.visit("/todos")

        // act
        cy
          .get("li button:first")
          .click()

        // assert
        cy
          .get('li')
          .should("have.length", 1)
    })

    it("Should not post an empty todo, or a todo that just contains whitespace", () => {
        // arrange 
        cy.visit("/todos")

        // act
        cy
          .get("input[type*='text']")
          .type("                           ")
        
        cy
          .get("input[type*='submit']")
          .click()
        
        // assert
        cy
          .get("li")
          .should("have.length", 2)
    })
})
