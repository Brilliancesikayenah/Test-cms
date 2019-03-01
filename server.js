const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pjson = require('./package.json');
const debug = require('debug')('app');

require('./config/index')(app);
require('./routes/index')(app);
require('./error-handling/index')(app); 

app.listen(port, error => {
    if (error) {
        debug(error);
        return;
    }
    debug(`${pjson.name} v${pjson.version} is running on http://localhost:${port}`);
});

