module.exports = {
  extends: 'eslint:recommended',
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  rules: {
    'array-bracket-spacing': [2, 'never'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    camelcase: [2, {properties: 'never'}],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'computed-property-spacing': [2, 'never'],
    'consistent-this': [2, 'self'],
    'func-call-spacing': [2, 'never'],
    'func-style': [1, 'declaration'],
    'id-blacklist': [2, 'data', 'info', 'obj'],
    'id-length': [1, {
      min: 1, max: 20,
      properties: 'never'
    }],
    indent: [2, 2],
    'key-spacing': [2],
    'linebreak-style': [2, 'unix'],
    // complexity
    'max-depth': [1, 3],
    'max-len': [2, {
      code: 80,
      ignoreTrailingComments: true,
      ignoreUrls: true
    }],
    'max-lines': [2, {max: 300, skipBlankLines: true, skipComments: true}],
    // complexity
    'max-nested-callbacks': [2, 2],
    'max-params': [1, 4],
    'max-statements-per-line': [2, {max: 2}],
    'max-statements': [1, 25],
    'new-cap': [2, {newIsCap: true, capIsNew: true}],
    'new-parens': 2,
    'newline-per-chained-call': [2, { ignoreChainWithDepth: 3 }],
    'no-array-constructor': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2, // Recommended
    'no-multiple-empty-lines': [2, {max: 2}],
    'no-restricted-syntax': [2, 'ClassBody', 'ClassDeclaration', 'ClassExpression'],
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': [2, { defaultAssignment: false }],
    'no-unused-vars': 1,
    'no-whitespace-before-property': 2,
    'operator-linebreak': [2, 'before'],
    'padded-blocks': [2, 'never'],
    quotes: [2, 'single', {
      avoidEscape: true, allowTemplateLiterals: true
    }],
    'semi-spacing': 2,
    semi: 2,
    'space-before-function-paren': 2,
    'space-infix-ops': [2, {int32Hint: false}]    
  }  
}
