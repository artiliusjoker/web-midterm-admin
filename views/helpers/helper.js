const qs = require('querystring');

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
            if (key === 'id') break;
            if (admin[key].length > 0) {
                if (statusDisplay.hasOwnProperty(admin[key])) {
                    result += `<td>${statusDisplay[admin[key]]}</td>`;
                }
                else if (roleDisplay.hasOwnProperty(admin[key])) {
                    result += `<td>${roleDisplay[admin[key]]}</td>`;
                }
                else result += `<td>${admin[key]}</td>`;
            } else result += '<td>Chưa có</td>';
        }
        return result;
    },

    createDropdown: wrapData => {
        const returnHTML = wrapData.map(field => {
            const { query, title, list } = field;
            let selectOfData = list.map(entry => {
                if (entry.key === undefined) return '';
                if (query === 'color' || query === 'size')
                    return `<label class="checkbox-inline i-checks pull-left">
                                <input type="checkbox" value="${entry.key}" id="${query}" name="${query}"> ${entry.name}
                            </label>`;
                else return `<option value="${entry.key}">${entry.name}</option>`;
            }).join('\n');

            let div;
            if (query !== 'color' && query !== 'size') {
                div = `<div class="form-select-list">
                            <select class="form-control custom-select-value" name="${query}">
                                ${selectOfData}
                            </select>
                        </div>`;
            }
            else div = `<div class="inline-checkbox-cs">
                            ${selectOfData}
                        </div>`;

            return `
                    <div class="form-group-inner">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                <label class="login2 pull-right pull-right-pro">${title}</label>
                            </div>
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                ${div}
                            </div>
                        </div>
                    </div>`
        }).join('\n');
        return returnHTML;
    },

    createPagination: (pageOptions) => {
        const { currentPage, url } = pageOptions;
        const totalPage = Math.ceil(pageOptions.totalItems / pageOptions.itemPerPage);
        if (totalPage <= 1)
            return '';

        let params = pageOptions.queryParams;
        let queryString;
        let str = '';
        // previous page
        if (currentPage > 1) {
            params.page = currentPage - 1;
            queryString = qs.stringify(params);
            str +=
                `<li>
                    <a href='${url}?${queryString}'>Prev</a>
                </li>`;
        }

        // first page
        if (currentPage === 1) {
            str +=
                `<li class='active'>
                    <a href='#'>1</a>
                </li>`;
        }
        else {
            params.page = 1;
            queryString = qs.stringify(params);
            str +=
                `<li>
                    <a href='${url}?${queryString}'>${params.page}</a>
                </li>`;
        }

        // previous page (number)
        if (currentPage > 2) {
            params.page = currentPage - 1;
            queryString = qs.stringify(params);
            if (currentPage > 3) {
                str +=
                    `<li>
                    <a href='#'>...</a>
                </li>`;
            }
            str +=
                `<li>
                    <a href='${url}?${queryString}'>${params.page}</a>
                </li>`;
        }

        // current page
        if (currentPage !== 1 && currentPage !== totalPage) {
            str +=
                `<li class='active'>
                    <a href='#'>${currentPage}</a>
                </li>`;
        }

        // next page (number)
        if (totalPage - currentPage > 1) {
            params.page = currentPage + 1;
            queryString = qs.stringify(params);
            str +=
                `<li>
                    <a href='${url}?${queryString}'>${params.page}</a>
                </li>`;
            if (totalPage - currentPage > 2) {
                str +=
                    `<li>
                    <a>...</a>
                </li>`;
            }
        }

        // last page
        if (currentPage === totalPage) {
            str +=
                `<li class='active'>
                    <a href='#'>${totalPage}</a>
                </li>`;
        }
        else {
            params.page = totalPage;
            queryString = qs.stringify(params);
            str +=
                `<li>
                    <a href='${url}?${queryString}'>${params.page}</a>
                </li>`;
        }

        // next page
        if (totalPage - currentPage > 0) {
            params.page = currentPage + 1;
            queryString = qs.stringify(params);
            str +=
                `<li>
                    <a href='${url}?${queryString}'>Next</a>
                </li>`;
        }
        return `
            <div class="row">
                <ul class="pagination">
                    ${str}
                </ul>
            </div>`
    }
}