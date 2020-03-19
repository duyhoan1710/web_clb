let express = require('express');
let morgan = require('morgan');
let logger = require('./logger/logger');

let app = express();

app.use(morgan(':method :url :status ', {"stream": logger.stream}));

require('./routers/router.index')(app);
// require('./routers/router.login')(app);
// require('./routers/router.register')(app);

app.listen(3001 , ()=>{
    logger.info('server is running in port 3000');
});