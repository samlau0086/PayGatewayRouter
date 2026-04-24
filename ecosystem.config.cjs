module.exports = {
  apps: [
    {
      name: 'vortexpay',
      script: 'node_modules/.bin/tsx',
      args: 'server.ts',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
