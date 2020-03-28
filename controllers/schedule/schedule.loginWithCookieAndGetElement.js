let request_promise = require('request-promise');
let cheerio = require('cheerio');

let loginWithCookie = (cookie)=>{
    return {
        uri : 'http://qldt.actvn.edu.vn/CMCSoft.IU.Web.Info/Reports/Form/StudentTimeTable.aspx',
        headers : {
            'Connection' : 'keep-alive',
            'Pragma' : 'no-cache',
            'Origin' : 'http://qldt.actvn.edu.vn',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9,vi;q=0.8',
            'Cookie' : cookie
        }
    }
};


module.exports = (cookies , viewState)=>{
    return new Promise((resolve, reject) => {
        request_promise(loginWithCookie(cookies)).then((res)=>{
            let $ = cheerio.load(res);
            let elements = {};
            let options = $('option[selected="selected"]');
            elements['__VIEWSTATE'] = viewState;
            elements['PageHeader1$drpNgonNgu'] = options[0].attribs.value;
            elements['drpSemester'] = options[1].attribs.value;
            elements['drpTerm'] = options[2].attribs.value;
            elements['drpType'] = options[3].attribs.value;
            elements['btnView'] = 'Xuất file Excel';
            let hiddenInputList = $('input[type="hidden"]');
            for (let i=0;i<hiddenInputList.length;i++){
                if (hiddenInputList[i].attribs.value == undefined){
                    elements[hiddenInputList[i].attribs.name] = '';
                }else{
                    elements[hiddenInputList[i].attribs.name] = hiddenInputList[i].attribs.value;
                }
            }
            resolve(elements);
        }).catch((e)=>{
            reject(e);
        })
    })
}