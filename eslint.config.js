import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'dist',
      'out',
      'node_modules',
      'build/*.js',
      'resources/*.js',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'style/no-trailing-spaces': 'off',
    },
  },
  {
    files: ['**/*.yaml', '**/*.yml'],
    rules: {
      'yaml/plain-scalar': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
)
