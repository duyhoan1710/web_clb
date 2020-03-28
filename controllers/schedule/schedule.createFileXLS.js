let request_promise = require('request-promise');
let fs = require('fs');
let path = require('path');
let logger = require('../../logger/logger');
let getDataJson = require('./schedule.handlingData');

let getFileXlS = (cookies , elements)=>{
    return {
        uri: 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx',
        method : 'POST',
        encoding: null,
        resolveWithFullResponse: true,
        headers : {
            'Connection' : 'keep-alive',
            'Pragma' : 'no-cache',
            'Origin' : 'http://qldt.actvn.edu.vn',
            'Upgrade-Insecure-Requests' : 1,
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Referer' : 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Cookie' : cookies
        },
        form : elements
    }
};

module.exports = (cookies , elements  , studentAccount) =>{
    return request_promise(getFileXlS(cookies , elements)).then(async (res)=>{
        let file = await fs.createWriteStream(path.resolve(`${__dirname}/files`,`${studentAccount}.xls`));
        await file.write(res.body);
        await file.end();
    }).catch((e)=>{
        logger.error(e);
    });
};