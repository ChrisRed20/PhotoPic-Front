describe('Pruebas de la pantalla de login', () => {
  beforeEach(() => {
    cy.visit('/login'); // Cambia la URL según tu aplicación
  });

  it('Debería mostrar el botón de Google', () => {
    cy.contains('Iniciar sesión con Google').should('exist');
  });

  it('Debería redirigir a la página de registro al hacer clic en registro', () => {
    cy.contains('Regístrate aquí').click();
    cy.url().should('include', '/signup'); // Cambia '/signup' según la ruta de tu aplicación
  });

  it('Debería iniciar sesión con credenciales válidas y redirigir al dashboard', () => {
    cy.get('input[type="text"]').type('test@example.com'); // Cambia el selector y el correo según tu aplicación
    cy.get('input[type="password"]').type('minecris10'); // Cambia el selector y la contraseña según tu aplicación
    cy.get('button[type="submit"]').click(); // Cambia el selector según tu aplicación
    cy.url().should('include', '/dashboard'); // Cambia '/dashboard' según la ruta de tu aplicación
  });
});