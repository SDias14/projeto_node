module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"], // extende as regras do airbnb e do prettier
  plugins: ["prettier"], // plugins que serão utilizados
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error", // retorna erro se o prettier não estiver configurado corretamente

    "class-methods-use-this": "off", // desabilita o uso do this
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-console": ["error", { allow: ["log", "error"] }], // permite o uso do console.log e console.error
  },
};
