import * as path from 'path'
import { defineConfig } from 'umi'

export default defineConfig({
	hash: true,
      cssnano: {},
      title:'Wave',
      singular: true,
      favicon:'favicon.ico',
	dva: { immer: true, hmr: true },
	nodeModulesTransform: { type: 'none' },
	alias: { '@root': path.join(__dirname, './') }
})
