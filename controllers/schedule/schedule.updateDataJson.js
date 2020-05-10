let XLSX = require('xlsx');
let path = require('path');

module.exports = ( objectData , arrayClass , fileName) => {
    const workbook = XLSX.readFile(path.resolve(`${__dirname}/xls` ,`${fileName}.xlsx`), {cellDates: true});
    const sheet_name_list = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]] );

    let convertTime = {
        '1->3' : '1-2-3',
        '1->4' : '1-2-3-4',
        '4->6' : '4-5-6',
        '1->6' : '1-2-3-4-5-6',
        '7->9' : '7-8-9',
        '9->12' : '9-10-11-12',
        '7->10' : '7-8-9-10',
        '10->12' : '10-11-12',
        '7->12' : '7-8-9-10-11-12',
        '13->16' : '13-14-15-16'
    };
    for(let i = 0; i< data.length; i++){
        if(arrayClass.indexOf(data[i]['Lớp học phần']) !== -1){
            let yearStart = new Date(data[i]['Ngày BĐ']).getFullYear();
            let monthStart = new Date(data[i]['Ngày BĐ']).getMonth()+ 1;
            let dateStart = new Date(data[i]['Ngày BĐ']).getDate();

            let yearEnd = new Date(data[i]['Ngày KT']).getFullYear();
            let monthEnd = new Date(data[i]['Ngày KT']).getMonth()+ 1;
            let dateEnd = new Date(data[i]['Ngày KT']).getDate();
            let startTime = new Date(yearStart + '/' + monthStart + '/' + dateStart).getTime();
            let endTime = new Date(yearEnd + '/' + monthEnd + '/' + dateEnd).getTime();
            for(let millisecond = startTime; millisecond <= endTime ; millisecond += 60*60*24*1000){
                if(objectData[millisecond]){
                    let count = 0;
                    for(let j = 0 ; j < objectData[millisecond].length ; j++){
                        if(objectData[millisecond][j].subject === data[i]['Lớp học phần']){
                            objectData[millisecond][j].lesson = convertTime[data[i]['Tiết học']];
                            objectData[millisecond][j].address = 'stay at home';
                            count = 1;
                        }
                    }
                    if(!count){
                        objectData[millisecond].push({
                            'school': true,
                            'subject' : data[i]['Lớp học phần'],
                            'address' : 'stay at home',
                            'lesson' : convertTime[data[i]['Tiết học']]
                        });
                    }
                }else{
                    objectData[millisecond] = [];
                    objectData[millisecond].push({
                        'school': true,
                        'subject' : data[i]['Lớp học phần'],
                        'address' : 'stay at home',
                        'lesson' : convertTime[data[i]['Tiết học']]
                    });
                }
            }
        }
    }
    return objectData;
};
