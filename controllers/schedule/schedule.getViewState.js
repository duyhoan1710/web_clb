let request_promise = require('request-promise');
let cheerio = require('cheerio');
let getOption = {
    uri: 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.info/Login.aspx',
};
module.exports = ()=>{
    return new Promise((resolve, reject) => {
        request_promise(getOption).then((res)=>{
            let $ = cheerio.load(res);
            let viewState = $('#__VIEWSTATE').val();
            resolve(viewState);
        }).catch((e)=>{
            reject(e);
        })
    })
};



