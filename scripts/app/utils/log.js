define(function() {

    function out(fn, args) {
        if (window.console) {
            window.console[fn].apply(window.console, args);
        }
    }

    function log() {

        switch (this.constructor) {

            case log:
                // constructor call, new instance via 'new' keyword: var logger = new log('MyClass'); logger.log('!');
                var prefix = arguments[0] || '',
                    prepare = function(args) {
                        return ['[' + prefix + '] '].concat([].slice.call(args));
                    };

                this.log = function() {
                    out('log', prepare(arguments));
                };
                this.info = function() {
                    out('info', prepare(arguments));
                };
                this.warn = function() {
                    out('warn', prepare(arguments));
                };
                this.error = function() {
                    out('error', prepare(arguments));
                };

                break;

            default:
                // simple call to required module as a function: log('!')
                out('log', arguments);
                return;
        }
    }

    // for simple calls to required module as object: log.warn('!')
    log.info = function() {
        out('info', arguments);
    };
    log.warn = function() {
        out('warn', arguments);
    };
    log.error = function() {
        out('error', arguments);
    };

    return log;
});
