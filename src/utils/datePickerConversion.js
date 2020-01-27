
//from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

function getDateValues(date){
    //input is Date String
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
    if (month.length < 2) 
    month = '0' + month;
    if (day.length < 2) 
    day = '0' + day;
    
    return ([year,month,day])
}

function formatDate(date) {
    const yearMonthDate = getDateValues(date);
    const output = [yearMonthDate[0],yearMonthDate[1],yearMonthDate[2]].join('-')
    return output;
}

function incrementAndFormatDate(formattedDate) {
    //input is yyyy-MM-dd
    const yearMonthDate = formattedDate.split('-');
    yearMonthDate[2]++;
    yearMonthDate[2] = yearMonthDate[2] > 9 ? yearMonthDate[2] : '0'+yearMonthDate[2];
    const output = [yearMonthDate[0],yearMonthDate[1],yearMonthDate[2]].join('-');
    console.log(output)
    return output;
}





module.exports = {formatDate, incrementAndFormatDate}