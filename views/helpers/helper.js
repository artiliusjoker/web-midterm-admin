module.exports = {
    listUsers: user => {
        let result = '';
        const statusDisplay = {
            'active' : '<span class="badge badge-success">Active</span>',
            'inactive' : '<span class="badge badge-warning">Inactive</span>',
            'banned' : '<span class="badge badge-danger">Banned</span>',
            'deleted' : '<span class="badge badge-dark">Deleted</span>'
        }
        const arrayUser = Object.keys(user);
        let key;
        for(let i = 0; i < arrayUser.length; i ++){
            key = arrayUser[i];
            if(key === 'email') break;
            if (key.length > 0) {
                if(statusDisplay.hasOwnProperty(user[key]))
                {
                    result += `<td>${statusDisplay[user[key]]}</td>`;
                }
                else result += `<td>${user[key]}</td>`; 
            }
            else result += '<td>null</td>';
        }
        return result;
    }
}