exports.getDateFormat = (date) => {
    const _date = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${_date}/${month}/${year}`;
}