let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let logger = require('./logger/logger');

let app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan(':method :url :status ', {"stream": logger.stream}));

require('./routers/router.index')(app);
require('./routers/router.login')(app);
require('./routers/router.register')(app);
require('./routers/router.users')(app);
app.listen(3000 , ()=>{
    logger.info('server is running in port 3000');
});