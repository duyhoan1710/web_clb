let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let logger = require('./logger/logger');

let app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan(':method :url :status ', {"stream": logger.stream}));
let authenticate = require('./middleware/authenticate/isAuth');


require('./routers/router.schedule')(app);
require('./routers/router.login')(app);
require('./routers/router.refreshToken')(app);
app.use(authenticate.isAuth);
require('./routers/router.users')(app);
require('./routers/router.notify')(app);

app.listen(3000 , ()=>{
    logger.info('server is running in port 3000');
});
