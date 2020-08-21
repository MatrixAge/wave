import * as path from 'path'
import { defineConfig } from 'umi'

const isProd = process.env.NODE_ENV === 'production'

const splitChunks = (config: any) => {
	config.merge({
		optimization: {
			minimize: true,
			splitChunks: {
				chunks: 'all',
				minSize: 30000,
				minChunks: 3,
				automaticNameDelimiter: '.',
				cacheGroups: {
					vendor: {
						name: 'vendors',
						test ({ resource }: any) {
							return /[\\/]node_modules[\\/]/.test(resource)
						},
						priority: 10
					}
				}
			}
		}
	})
}

export default defineConfig({
	hash: true,
	cssnano: {},
	esbuild: {},
	title: 'Wave',
	singular: true,
	favicon: '/favicon.ico',
      dva: { immer: true, hmr: true },
      alias: { '@root': path.join(__dirname, './') },
	dynamicImport: { loading: '@/component/Landing' },
	nodeModulesTransform: { type: 'none', exclude: [] },
	targets: { chrome: 79, firefox: false, safari: false, edge: false, ios: false },
	chainWebpack: (config) => {
		if (isProd) splitChunks(config)
	}
})
