const User = require('./user');
const bcrypt = require('bcryptjs');
let service = {};

service.findByUname = async (username) => {
    const result = await User.findOne({ username: username });
    return result;
};

service.findByEmail = async (email) => {
    const result = await User.findOne({ email: email });
    return result;
};

exports.queryAllUsers = async (req, res) => {
    const userQuery = await User.find({}, '-order');

    const users = userQuery.map(user => ({
        fullname: user.name,
        username: user.username,
        status: user.status,
        email: user.email,
        phoneNum: user.phone,
        moneySpent: '200,000',
        createAt: new Date(user.createdAt),
        id: user._id
    }))
    users.forEach(user => {
        const temp = user.createAt;
        user.dayCreated = `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`;
        delete user.createAt;
    })
    return users;
}

exports.querryDetail = async (req, res) => {
    let result;
    try {
        const userDetail = await User.findById(req.params.id, '-order -active -createAt -updateAt');
        const dateToString =`${userDetail.dob.getFullYear()}-${userDetail.dob.getMonth() + 1}-${userDetail.dob.getDate()}`;
        console.log(dateToString);
        result = {
            fullname: userDetail.name,
            username: userDetail.username,
            email: userDetail.email,
            phone: userDetail.phone,
            address: userDetail.address,
            status: userDetail.status,
            dob: dateToString,
            avatar: 'null',
        }
    } catch (error) {
        throw (new Error('User does not exist !'));
    }
    return result;
}

exports.updateUser = async (userId, body) => {
    let status = true,
        message = 'Cập nhật thành công',
        type = 'success';

    const updateInfo = {
        name: body.fullname,
        address: body.address,
        phone: body.phone,
        email: body.email,
        dob: body.dob
    }

    if(body.status != 'null') updateInfo.status = body.status;

    const user = await User.findByIdAndUpdate(userId, updateInfo);
   
    if (body.password.length != 0 && body.password.length < 6) {
        status = false;
        message = 'Độ dài mật khẩu mới phải lớn hơn 6, thông tin khác vẫn được cập nhật !';
        type = 'error'
    }
    else if(body.password.length != 0){
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(body.password, salt);
        user.password = hashedPass;
        message = 'Cập nhật thông tin và mật khẩu thành công';
    }
    if (user.username != body.username)
    {
        if(await service.findByUname(body.username))
        {
            message = 'Tên đăng nhập đã tồn tại, xin chọn tên khác, các thông tin mới vẫn được lưu lại !';
            status = false;
            type = 'error';
        }
        else{
            user.username = body.username;
            await user.save();
        }
    }

    return {
        status,
        message,
        type
    }
}

exports.addUser = async (userInfo) => {
    let result = true;
    let message = 'Tạo thành công !';
    // Validate dependencies
    if (userInfo.password.length < 6) {
        result = false;
        message = 'Mật khẩu phải dài hơn hoặc bằng 6 kí tự !';
    }
    else if (await service.findByUname(userInfo.username)) {
        result = false;
        message = 'Tên đăng nhập đã có, hãy thử lại !';
    }

    if(!result) return {
        result,
        message
    }

    const newUser = new User({
        username: userInfo.username,
        name: userInfo.fullname,
        dob: userInfo.dob,
        phone: userInfo.phone,
        email: userInfo.email,
        address: userInfo.address,
        status: userInfo.status
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    newUser.password = hashedPassword;
    await newUser.save();
    return ({
        result,
        message
    })
}