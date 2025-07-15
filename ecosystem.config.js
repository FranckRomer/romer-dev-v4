module.exports = {
    apps: [
        {
            name: 'romer-dev-v4',
            script: 'npm',
            args: 'run preview',
            cwd: '/var/www/romer-dev-v4',
            env: {
                NODE_ENV: 'production',
                HOST: '0.0.0.0',
                PORT: 4321
            },
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G'
        }
    ]
};
