module.exports = function() {
    var config = {

        //all the js i want to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ]
    };

    return config;
};