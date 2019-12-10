const bcrypt = require('bcrypt');
const Admin = require('./admin');

var service = {};

service.findByUname = (username, callback) => {
    Admin.findOne({username : username}, callback);
};

service.createAdmin = async (body) =>{
    let result = true;
    let message = '';
    // Check password strength
    if (body.password.length < 6)
    {
        result = false;
        message = 'Mật khẩu phải dài từ 6 kí tự';
        return ({
            result,
            message
        });
    }
    // Check existed account
    service.findByUname(body.username, function (err, user) {
        if(err || user)
        {
            result = false;
            message = 'Tên đăng nhập đã được sử dụng';
            return ({
                result,
                message
            });
        }
    });
    // Create new admin
    const admin = new Admin({
        email: body.email,
        password : body.password,
	    username: body.username,
	    fullname: body.fullname,
	    phone: body.phone,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(admin.password, salt);
    admin.password = hashedPass;
    await admin.save();
    message = "Đăng kí thành công";
    return ({
        result,
        message
    });
};

service.validatePass = (password, passHash, callback) => {
    bcrypt.compare(password, passHash, function(err, res){
        if(err) throw err;
        callback(null, res);
    });
};

service.findByEmail = (email, callback) => {
    Admin.findOne({email : email}, callback);
};

module.exports = service;