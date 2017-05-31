module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [{
		name: 'madpost',
		script: 'server.js',
		exec_mode : "cluster",
		instances : 0,
	}],
}
