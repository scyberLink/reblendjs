import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'cjs/popper.js',
  output: {
    file: 'cjs/popper.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
  external: [], // bundle everything
};
