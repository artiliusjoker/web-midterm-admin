const bcrypt = require('bcryptjs');
const Admin = require('./admin');

var service = {};

service.findByUname = async (username) => {
    const result = await Admin.findOne({ username: username });
    return result;
};

service.findByEmail = async (email) => {
    const result = await Admin.findOne({ email: email });
    return result;
};

service.createAdmin = async (body) => {
    let result = true;
    let message = '';
    let flag = false;
    // Check password strength and validate existed account
    if(body.password.length < 6){
        result = false;
        message = 'Độ dài mật khẩu phải lớn hơn 6';
        flag = true;
    }
    else if (await service.findByUname(body.username))
    {
        result = false;
        message = 'Tài khoản đã tồn tại, bạn có quên mật khẩu không ?';
        flag = true;
    }
    if (flag) return ({
        result,
        message
    });

    // Store new admin info
    const admin = new Admin({
        username: body.username,
        password: body.password,
        email: body.email,
        fullname: body.fullname,
        phone: body.phone,
    });

    // Generate hash string to store in database
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(admin.password, salt);
    admin.password = hashedPass;
    // Save admin
    await admin.save();
    message = "Đăng kí thành công";
    return ({
        result,
        message
    });
};

service.validatePass = async (password, passHash) => {
    const result = await bcrypt.compare(password, passHash);
    return result;
};

module.exports = service;