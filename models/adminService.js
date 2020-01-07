const bcrypt = require('bcryptjs');
const Admin = require('./admin');
const Util = require('../util');

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
    if (body.password.length < 6) {
        result = false;
        message = 'Độ dài mật khẩu phải lớn hơn 6';
        flag = true;
    }
    else if (await service.findByUname(body.username)) {
        result = false;
        message = 'Tài khoản đã tồn tại, xin hãy thử lại !';
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

    if(body.status != undefined) admin.status = body.status;
    if(body.role != undefined) admin.role = body.role;
    if(body.dob != undefined) admin.dob = body.dob;
    if(body.avatar != undefined) admin.avatar = body.avatar;
    if(body.address != undefined) admin.address = body.address;
    
    // Generate hash string to store in database
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(admin.password, salt);
    admin.password = hashedPass;
    // Save admin
    await admin.save();
    message = "Tạo mới thành công";
    return ({
        result,
        message
    });
};

service.validatePass = async (password, passHash) => {
    const result = await bcrypt.compare(password, passHash);
    return result;
};

service.updateAdmin = async (adminId, body) => {
    let status = true,
        message = 'Cập nhật thành công',
        type = 'success';

    const updateInfo = {
        fullname: body.fullname,
        address: body.address,
        phone: body.phone,
        email: body.email,
        dob: body.dob
    }

    if(body.status != undefined) updateInfo.status = body.status;
    if(body.role != undefined) updateInfo.role = body.role;

    const admin = await Admin.findByIdAndUpdate(adminId, updateInfo);

    if (body.password.length != 0 && body.password.length < 6) {
        status = false;
        message = 'Độ dài mật khẩu mới phải lớn hơn 6, thông tin khác vẫn được cập nhật !';
        type = 'error'
    }
    else if (body.password.length != 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(body.password, salt);
        admin.password = hashedPass;
        message = 'Cập nhật thông tin và mật khẩu thành công';
    }
    if (admin.username != body.username) {
        if (await service.findByUname(body.username)) {
            message = 'Tên đăng nhập đã tồn tại, xin chọn tên khác, các thông tin mới vẫn được lưu lại !';
            status = false;
            type = 'error';
        }
        else {
            admin.username = body.username;
            await admin.save();
        }
    }

    return {
        status,
        message,
        type
    }
}

service.queryAll = async () => {
    const adminQuery = await Admin.find({}, '-address -avatar -birthday');

    const admins = adminQuery.map(admin => ({
        username: admin.username,
        fullname: admin.fullname,
        status: admin.status,
        role: admin.role,
        id: admin._id
    }))
    return admins;
}

service.queryDetail = async (adminId) => {
    const adminDetail = await Admin.findById(adminId);
    const result = {
        fullname: adminDetail.fullname,
        username: adminDetail.username,
        email: adminDetail.email,
        phone: adminDetail.phone,
        address: adminDetail.address,
        dob: adminDetail.dob ? Util.getDateFormat(adminDetail.dob) : 'null',
        avatar: 'null',
        status: adminDetail.status,
        role: adminDetail.role,
    }
    return result;
}

module.exports = service;