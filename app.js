let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let logger = require('./logger/logger');

let app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan(':method :url :status ', {"stream": logger.stream}));
let authenticate = require('./middleware/authenticate/isAuth');

// app.use((req, res, next)=>{
//     console.log('1');
//     next();
// });
// app.use((req, res, next)=>{
//     console.log('2');
//     next();
// });
// require('./routers/test/router.test')(app);
require('./routers/router.schedule')(app);
require('./routers/router.login')(app);
require('./routers/router.refreshToken')(app);

// app.use(authenticate.isAuth);

// app.use((req, res, next)=>{
//     console.log('3');
//     res.json({
//         error: 'errorr bé'
//     })
// });

require('./routers/router.users')(app);
require('./routers/router.notify')(app);
require('./routers/router.groupRole')(app);
// app.use((err, req, res, next)=>{
//     console.log('4');
//     next(err);
// });
// app.use((err ,req, res, next)=>{
//     console.log(err);
//     res.json({
//         error: err
//     })
// });

app.listen(5000 , ()=>{
    logger.info('server is running in port 3000');
});
