import { deleteFood, searchFoods } from "../../src/services/foodsApi";

describe("Admin", () => {
  beforeEach(() => {
    // Delete any pre-existing records from a previous test run.
    searchFoods("BBQ Ribs").then((foods) => {
      foods.forEach((food) => {
        deleteFood(food.id);
      });
    });
  });

  it("should run validation, submit a new Food, and display it on the menu page", () => {
    cy.visit("http://127.0.0.1:5173/");
    cy.findByRole("link", { name: "Admin" }).click();

    validateOnBlur();
    addNewFood();
  });
});

function addNewFood() {
  cy.findByLabelText("Name").type("BBQ Ribs");
  cy.findByLabelText("Description").type("Tangy and sweet");
  cy.findByLabelText("Price").clear().type("19.99");
  cy.findByLabelText("Image filename").type("fake-photo.jpg");
  cy.findByLabelText("Breakfast").check();
  cy.findByRole("button", { name: "Save" }).click();
  cy.findByRole("button", { name: "Saving..." });
  cy.findByRole("link", { name: "Home" }).click();
  cy.findByRole("heading", { name: "BBQ Ribs" });
}

function validateOnBlur() {
  cy.findByLabelText("Name").focus().blur();
  cy.findByText("Name is required");

  cy.findByLabelText("Description").focus().blur();
  cy.findByText("Description is required");

  cy.findByLabelText("Price").focus().blur();
  cy.findByText("Price is required");

  cy.findByLabelText("Image filename").focus().blur();
  cy.findByText("Image filename is required");
}
