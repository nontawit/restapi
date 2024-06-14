const moment = require('moment');

const formatDate = (dateStr) => moment(dateStr, 'DD/MM/YYYY').format('YYYY-MM-DD');
const formatThaiDate = (dateStr) => {
    const date = moment(dateStr).add(543, 'years'); // Add 543 years for Buddhist calendar
    return date.format('DD/MM/YYYY');
};

const convertToGregorianYear = (thaiDateStr) => {
    const [day, month, thaiYear] = thaiDateStr.split('/');
    const gregorianYear = parseInt(thaiYear) - 543;
    return `${day}/${month}/${gregorianYear}`;
};

module.exports = {
    formatDate,
    formatThaiDate,
    convertToGregorianYear
};
