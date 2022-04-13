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

    it("Should render a message when there are no todos, instead of a list", () => {
        // arrange
        cy.visit("/todos")

        // act
        cy
          .get("li button:first")
          .click()
        cy
          .get("li button:first")
          .click()
        cy
          .get("ul")
          .as("todos")  

        // assert
        cy
          .get("@todos")
          .should("have.length", 1)
          .should("include.text", "Add some to-dos")
    })

    it("Should go from list of tasks, to message when no tasks, then back to a list upon submission", () => {
        // arrange
        cy.visit("/todos")

        cy
          .get("ul")
          .as("todos")

        cy
          .get("li")
          .should("have.length", 2)

        // act
        cy
          .get("li button:first")
          .click()

        cy
          .get("li button:first")
          .click()

        cy
          .get("@todos")
          .should("have.length", 1)

        cy
          .get("@todos")
          .should("include.text", "Add some to-dos")

        cy
          .get("input[type*='text']")
          .as("input")
          .get("input[type*='submit']")
          .as("submit")

        cy
          .get("@input")
          .type("This is the first todo after deleting the other ones")
        
        cy.get("@submit").click()

        // assert
        cy
          .get("@todos")
          .should("have.length", 1)
        
        cy
          .get("li")
          .should("include.text", "This is the first todo after deleting the other ones")
        
        cy
          .get("li button:first")
          .click()
        
        cy
          .get("@todos")
          .should("include.text", "Add some to-dos with the form below!")
    })
})
