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
        result = {
            fullname: userDetail.name,
            username: userDetail.username,
            email: userDetail.email,
            phone: userDetail.phone,
            status: userDetail.status,
            dob: userDetail.dob,
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
        type = 'success',
        flag = false;
    
    if(body.password.length != 0 && body.password.length < 6){
        status = false;
        message = 'Độ dài mật khẩu mới phải lớn hơn 6';
        flag = true;
        type = 'error'
    }

    else if (await service.findByUname(body.username))
    {
        status = false;
        message = 'Tên đăng nhập này đã có, không thể đổi !';
        flag = true;
        type = 'error';
    }
    if (flag) return ({
        status,
        message,
        type
    })

    const updateInfo = {
        username : body.username,
        name: body.fullname,
        address: body.address,
        phone: body.phone,
        email: body.email
    }

    const user = await User.findByIdAndUpdate(userId, updateInfo);

    if(body.password.length != 0){
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(admin.password, salt);
        user.password = hashedPass;
        flag = true;
    }
    
    if(flag == true) await user.save();

    return{
        status,
        message,
        type
    }
}