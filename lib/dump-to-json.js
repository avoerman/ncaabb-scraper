var fs = require('fs');

module.exports = exports = {
    dump: function(data, filename) {
        var path = './data/' + filename;
        fs.writeFile(path, JSON.stringify(data, null, 0), function(err) {
            if (err) console.log('Error writing file');
        });
    }
};
