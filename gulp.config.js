module.exports = function() {
    var client = './src/client/';
    var config = {
        temp: './.tmp/',

        /**
         * File Paths
         * 
         */
        //all the js i want to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],

        less: client + 'styles/styles.less'
    };

    return config;
};