module.exports = {
	apps: [{
		name: 'partner-website',
		script: 'pnpm',
		args: 'start --port 3002',
		cwd: '/var/www/turbo/prod/turbo-delivery-partner',
		env: {
			NODE_ENV: 'production',
			PORT: 3002 // Port sur lequel l'application va tourner
		}
	}]
}
