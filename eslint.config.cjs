// eslint.config.cjs
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  // configuração recomendada do @eslint/js
  js.configs.recommended,

  // bloco customizado sem usar "env" ou "extends"
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      ecmaVersion: 2021,
      sourceType: "module"
    },
    // regras personalizadas aqui
    rules: {
      // ex: "no-console": "warn"
    }
  }
];
