import { config } from '@hakui/eslint-config/next-js';

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  { rules: { 'react/prop-types': 'off' }, },
  { ignores: ['.contentlayer/**'], },
];
