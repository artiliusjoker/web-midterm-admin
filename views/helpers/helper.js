module.exports = {
    listUsers: user => {
        let result = '';
        Object.keys(user).forEach(function (key) {
            if (user[key] && user[key].length > 0) {
                result += `<td>${user[key]}</td>`; 
            }
            else result += '<td>null</td>';
        })
        return result;
    }
}