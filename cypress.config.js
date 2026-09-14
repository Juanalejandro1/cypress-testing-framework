import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config(); // Carga el .env de la raíz

export default defineConfig({
  viewportHeight: Number(process.env.VIEWPORT_HEIGHT),
  viewportWidth: Number(process.env.VIEWPORT_WIDTH),
  e2e: {
    baseUrl: process.env.BASE_URL,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 MozzoCypressE2E',
    env: {
      viewportHeight: Number(process.env.VIEWPORT_HEIGHT),
      viewportWidth: Number(process.env.VIEWPORT_WIDTH),
      environment: process.env.TEST_ENV || 'local',
      apiUrl: process.env.API_URL,
      testUserEmail: process.env.TEST_USER_EMAIL,
      testUserPassword: process.env.TEST_USER_PASSWORD,
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
        }
        if (browser.family === 'firefox') {
          launchOptions.preferences['dom.webdriver.enabled'] = false;
          launchOptions.preferences['useAutomationExtension'] = false;
        }
        return launchOptions;
      });
      return config;
    },
  },
});