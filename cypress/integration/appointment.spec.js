describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    const new_appointment = cy.get("[alt=Add]").first();
    new_appointment.click();
    new_appointment.get("[data-testid=student-name-input]").type("Xev B");
    new_appointment.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card-left", "Xev B").should("to.exist");
    cy.contains(".appointment__card-left", "Tori Malcolm").should("to.exist");
  });

  it("should edit an interview", () => {
    const current_appointment = cy
      .contains('[data-testid="showitem"]', "Archie Cohen")
      .get('[alt="Edit"]')
      .click({ force: true });
    current_appointment
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Zoey B");
    current_appointment.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card-left", "Zoey B").should("to.exist");
    cy.contains(".appointment__card-left", "Tori Malcolm").should("to.exist");
  });

  it("should cancel an interview", () => {
    const current_appointment = cy
      .contains('[data-testid="showitem"]', "Archie Cohen")
      .get("[alt=Delete]")
      .click({ force: true });
    cy.contains("Button", "Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains('[data-testid="showitem"]', "Archie Cohen").should("not.exist");
  });
});
