module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : './',
	outputDir: 'dist',
	assetsDir: 'static',
	chainWebpack: config = > {
		config.rule('js').include.add(/node_modules\/(dom7|swiper)\/.*/)
	}
}
