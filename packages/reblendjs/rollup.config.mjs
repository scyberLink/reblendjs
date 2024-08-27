import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default {
  input: 'lib/internal/worker.js',
  output: {
    file: 'lib/internal/worker.min.js',
    format: 'iife', // Immediately Invoked Function Expression format
  },
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS to ES6
    terser(), // Minifies the output
  ],
}
