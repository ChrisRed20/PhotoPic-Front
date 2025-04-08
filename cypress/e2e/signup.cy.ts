describe('Registro nuevo de usuario', () => {
  it('Deberia registrar al usuario con correo y contraseña', () => {
    cy.visit('/signup'); // Cambia la URL al formulario de registro de tu aplicación

    // Completar el formulario de registro
    cy.get('input[type="text"]').type('testuser@example.com'); // Cambia el selector según tu formulario
    cy.get('input[type="password"]').type('Password123!'); // Cambia el selector según tu formulario

    // Enviar el formulario
    cy.get('button[type="submit"]').click(); // Cambia el selector según tu botón de envío

    // Verificar que el registro fue exitoso
    cy.url().should('include', '/dashboard'); // Cambia '/dashboard' según la ruta de tu aplicación después del registro
  });
});