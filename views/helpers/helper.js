module.exports = {

    listUsers: user => {
        let result = '';
        const statusDisplay = {
            'active': '<span class="badge badge-success">Đang hoạt động</span>',
            'inactive': '<span class="badge badge-warning">Ngừng hoạt động</span>',
            'banned': '<span class="badge badge-danger">Bị khoá</span>',
            'deleted': '<span class="badge badge-dark">Đã xoá</span>'
        }
        const displayProperties = ['fullname', 'username', 'status', 'email', 'phoneNum', 'dayCreated'];
        const arrayUser = Object.keys(user);

        let key;
        for (let i = 0; i < arrayUser.length; i++) {
            key = arrayUser[i];
            if (displayProperties.includes(key)) {
                if (user[key].length > 0) {
                    if (statusDisplay.hasOwnProperty(user[key])) {
                        result += `<td>${statusDisplay[user[key]]}</td>`;
                    }
                    else result += `<td>${user[key]}</td>`;
                } else result += '<td>Chưa có</td>';
            }
        }
        return result;
    },

    selectedOption: userDetailStatus => {
        let options = {
            active: 'class="text-success" value="active">Hoạt động (active)',
            banned: 'class="text-danger" value="banned">Khoá (banned)',
            inactive: 'class="text-warning" value="inactive">Buộc xác nhận lại (inactive)',
            deleted: 'class="text-muted" value="null">Đã bị xoá (deleted)',
        }
        let result = '';
        for (let element in options) {
            if (userDetailStatus === element) {
                result += `<option selected ${options[element]} - current</option>`;
            }
            else result += `<option ${options[element]}</option>`;
        }
        return result;
    },

    listAdmin: admin => {
        let result = '';
        const statusDisplay = {
            'active': '<span class="badge badge-success">Đang hoạt động</span>',
            'blocked': '<span class="badge badge-warning">Bị khoá</span>',
            'deleted': '<span class="badge badge-dark">Đã xoá</span>'
        }
        const roleDisplay = {
            normal: '<span class="badge badge-primary">Quản trị viên</span>',
            monitor: '<span class="badge badge-light">Giám sát viên</span>',
            editor: '<span class="badge badge-info">Quản lý hàng</span>',
            super: '<span class="badge badge-dark">Quản trị hệ thống</span>'
        }

        const arrayKeys = Object.keys(admin);

        let key;
        for (let i = 0; i < arrayKeys.length; i++) {
            key = arrayKeys[i];
            if(key === 'id') break;
            if (admin[key].length > 0) {
                if (statusDisplay.hasOwnProperty(admin[key])) {
                    result += `<td>${statusDisplay[admin[key]]}</td>`;
                }
                else if(roleDisplay.hasOwnProperty(admin[key])){
                    result += `<td>${roleDisplay[admin[key]]}</td>`;
                }
                else result += `<td>${admin[key]}</td>`;
            } else result += '<td>Chưa có</td>';
        }
        return result;
    }
}