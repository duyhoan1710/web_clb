let request_promise = require('request-promise');

let postOption = (studentAccount , studentPassword ,viewState, eventValidation)=>{
    return {
        uri: 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.info/Login.aspx',
        method : 'POST',
        simple: false,
        timeout: 20000,
        followRedirect: true,
        resolveWithFullResponse: true,
        headers : {
            'Connection' : 'keep-alive',
            'Pragma' : 'no-cache',
            'Origin' : 'http://qldt.actvn.edu.vn',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9,vi;q=0.8',
        },
        form : {
            '__EVENTVALIDATION': eventValidation,
            '__VIEWSTATE' : viewState,
            'txtUserName' : studentAccount,
            'txtPassword' : studentPassword,
            'btnSubmit' : 'Đăng+nhập',
        }
    }
};
module.exports = async (viewState, eventValidation, studentAccount , passwordAccount)=>{
    return new Promise((resolve, reject) => {
        request_promise(postOption( studentAccount , passwordAccount , viewState, eventValidation)).then((res)=>{
            resolve(res.headers['set-cookie']);
        }).catch((e)=>{
            reject(e);
        })
    })
};