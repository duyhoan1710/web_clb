const XLSX = require('xlsx');
let path = require('path');

module.exports = (fileName)=>{
    const workbook = XLSX.readFile(path.resolve(`${__dirname}/files` ,`${fileName}.xls`));
    const sheet_name_list = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let objectData = {};
    let regex_get_time = /Từ (.*) đến (.*):\s*(Thứ (.*) tiết (.*) tại (.*)\s*)+/gi;
    for(let i = 8 ; i< data.length-5 ; i++){
        let string = data[i]['__EMPTY_6'].toString();
        console.log(string);
        let time_address = [...string.matchAll(regex_get_time)];
        console.log(time_address);
        time_address.forEach(temp =>{
            // đổi ngày tháng sang giây
            let startTime = temp[1].split('/');
            let startMillisecond = new Date(startTime[2] + '/' + startTime[1] + '/' + startTime[0]).getTime();
            let endTime = temp[2].split('/');
            let endMillisecond = new Date(endTime[2] + '/' + endTime[1] + '/' + endTime[0]).getTime();

            for(let millisecond = startMillisecond ; millisecond <= endMillisecond ; millisecond += 60*60*24*1000){
                let getDay = (new Date(millisecond)).getDay();
                if(temp[0].length > 85){   // nếu môn này học 2 buổi trở lên trong 1 tuần
                    let regex_time = /(Thứ (.*) tiết (.*) tại (.*))/g;
                    let match_time = [...temp[0].matchAll(regex_time)];
                    match_time.forEach(time =>{
                        if(parseInt(time[2]) === getDay + 1){
                            let obj = {};
                            obj[millisecond] = {
                                'subject' : data[i]['__EMPTY_4'],
                                'address' : time[4],
                                'lesson' : time[3]
                            };
                            if(objectData[millisecond]){
                                objectData[millisecond].push(obj[millisecond]);
                            }
                            else{
                                objectData[millisecond] = [];
                                objectData[millisecond].push(obj[millisecond]);
                            }
                        }
                    })
                }
                else{
                    if(parseInt(temp[4]) === getDay + 1){
                        let obj = {};
                        obj[millisecond] = {
                            'subject' : data[i]['__EMPTY_4'],
                            'address' : temp[6],
                            'lesson' : temp[5]
                        };
                        if(objectData[millisecond]){
                            objectData[millisecond].push(obj[millisecond]);
                        }
                        else{
                            objectData[millisecond] = [];
                            objectData[millisecond].push(obj[millisecond]);
                        }
                    }
                }
            }
        });
    }
    return objectData;
};


