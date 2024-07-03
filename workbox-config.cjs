module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,html,svg,png}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	runtimeCaching: [
		{
		  urlPattern: /^https?.*/,
		  handler: 'NetworkFirst',
		  options: {
			cacheName: 'offlineCache',
			expiration: {
			  maxEntries: 200 
			}
		  }
		}
	  ]
};