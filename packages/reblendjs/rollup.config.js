import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const input = 'build/index.js';

const devConfig = [
  // CommonJS (dev)
  {
    input,
    output: {
      file: 'lib/cjs/reblendjs.cjs.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
  // ESM (dev)
  {
    input,
    output: {
      file: 'lib/esm/reblendjs.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
  // UMD (dev)
  {
    input,
    output: {
      file: 'lib/umd/reblendjs.umd.js',
      format: 'umd',
      name: 'Reblend',
      exports: 'auto',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
];

const prodConfig = [
  // CommonJS (prod)
  {
    input,
    output: {
      file: 'lib/cjs/reblendjs.cjs.min.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: false,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  // ESM (prod)
  {
    input,
    output: {
      file: 'lib/esm/reblendjs.esm.min.js',
      format: 'esm',
      sourcemap: false,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
  // UMD (prod)
  {
    input,
    output: {
      file: 'lib/umd/reblendjs.umd.min.js',
      format: 'umd',
      name: 'Reblend',
      exports: 'auto',
      sourcemap: false,
    },
    plugins: [resolve(), commonjs(), terser()],
  },
];

export default commandLineArgs => {
  if (commandLineArgs.configProd) {
    return prodConfig;
  }
  return devConfig;
};