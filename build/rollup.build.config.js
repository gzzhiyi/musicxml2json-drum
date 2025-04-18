import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import del from 'rollup-plugin-delete'
import path from 'path'
import packageJSON from '../package.json'

const getPath = _path => path.resolve(__dirname, _path)
const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

export default {
  input: getPath('../src/index.ts'),
  external: [
    'react',
    'react-dom'
  ],
  output: [
    {
      name: 'musicxml2json-drum',
      file: packageJSON.main, // 通用模块
      format: 'umd',
    },
    {
      name: 'musicxml2json-drum',
      file: packageJSON.module, // es6模块
      format: 'esm',
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    }),
    json(),
    nodeResolve(extensions),
    commonjs(),
    eslint({
      throwOnError: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**', 'example/**', 'build/**']
    }),
    typescript({
      extensions
    }),
    uglify()
  ]
}
