module.exports = {
  apps: [
    {
      name: 'vortexpay',
      script: 'node_modules/.bin/tsx',
      args: 'server.ts',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
