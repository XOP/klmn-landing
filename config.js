/**
 * Config file
 *
 */

var config = {
    paths: {
        css : {
            src : 'harp/www/css',
            dest : 'public/css'
        },
        html : {
            src : 'harp/www',
            dest : 'public'
        },
        js : {
            src : 'harp/www/js',
            dest : 'public/js'
        },
        img : {
            src : 'harp/www/img',
            dest : 'public/img'
        },
        fonts : {
            src : 'harp/www/fonts',
            dest : 'public/fonts'
        },
        deps : {
            normalize : 'node_modules/normalize.css'
        }
    }
};

module.exports = config;
