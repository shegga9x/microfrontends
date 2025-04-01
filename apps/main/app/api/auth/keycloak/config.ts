export const keycloakConfig = {
  url: process.env.KEYCLOAK_URL || 'http://localhost:9080',
  realm: process.env.KEYCLOAK_REALM || 'jhipster',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'web_app',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  redirectUri: process.env.KEYCLOAK_REDIRECT_URI || 'http://localhost:3000/login/callback',
} 