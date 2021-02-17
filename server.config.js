module.exports = {
    apps: [{
        name: 'lb-central-js',
        script: 'server/server.js',
        instances: 1,
        exec_mode: 'fork',
        watch: true,
        log_file: '~/.pm2/logs/lb-template-acceso-js.log',
        out_file: 'NULL', // ~/.pm2/logs/lb-trx-js.log
        error_file: 'NULL', // ~/.pm2/logs/lb-trx-js.log
        combine_logs: true,
        merge_logs: true,
        env_production: {
            NODE_ENV: 'production'
        },
        env_development: {
            NODE_ENV: 'development'
        }
    }]
};