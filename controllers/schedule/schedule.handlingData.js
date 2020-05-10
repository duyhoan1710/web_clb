const XLSX = require('xlsx');
let path = require('path');

module.exports = (fileName)=>{
    const workbook = XLSX.readFile(path.resolve(`${__dirname}/files` ,`${fileName}.xls`));
    const sheet_name_list = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    // let arrayClass = [];

    let objectData = {};
    let regex_get_time = /Từ (.*) đến (.*):\s*(Thứ (.*) tiết (.*)( tại (.*))?\s*)+/gi;
    for(let i = 8 ; i< data.length-5 ; i++){
        data[i]['__EMPTY_6'] = data[i]['__EMPTY_6'].replace(/Chủ nhật/g, 'Thứ 1');
        let time_address = [...data[i]['__EMPTY_6'].matchAll(regex_get_time)];

        // arrayClass.push(data[i]['__EMPTY_4']);
        time_address.forEach(temp =>{
            // đổi ngày tháng sang giây
            let startTime = temp[1].split('/');
            let startMillisecond = new Date(startTime[2] + '/' + startTime[1] + '/' + startTime[0]).getTime();
            let endTime = temp[2].split('/');
            let endMillisecond = new Date(endTime[2] + '/' + endTime[1] + '/' + endTime[0]).getTime();

            for(let millisecond = startMillisecond ; millisecond <= endMillisecond ; millisecond += 60*60*24*1000) {
                let getDay = (new Date(millisecond)).getDay();
                let regex_time = /(Thứ (.*) tiết ([\d,]*)( tại (.*))?)/g;

                let match_time = [...temp[0].matchAll(regex_time)];
                // console.log(match_time);
                match_time.forEach(time => {
                    // console.log(time);
                    if (parseInt(time[2]) === getDay + 1) {
                        let obj = {};
                        obj[millisecond] = {
                            'school': true,
                            'subject': data[i]['__EMPTY_4'],
                            'address': time[5] || 'null',
                            'lesson': time[3]
                        };
                        if (objectData[millisecond]) {
                            objectData[millisecond].push(obj[millisecond]);
                        } else {
                            objectData[millisecond] = [];
                            objectData[millisecond].push(obj[millisecond]);
                        }
                    }
                })
            }
        });
    }
    return {objectData};
};


