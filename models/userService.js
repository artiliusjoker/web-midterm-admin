const user = require('./user');

exports.queryAllUsers = async (req, res) => {
    const userQuery = await user.find({}, '-order');

    const users = userQuery.map(user => ({
        fullname: user.name,
        username: user.username,
        status: user.status,
        email: user.email,
        phoneNum: user.phone,
        moneySpent: '200,000',
        createAt: new Date(user.createdAt),
    }))
    users.forEach(user => {
        const temp = user.createAt;
        user.dayCreated = `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`;
        delete user.createAt;
    })
    return users;
}

exports.querryDetail = async (req, res) => {
    const userDetail = await user.findById(req.params.id, '-order -active -createAt -updateAt');
    const result = {
        fullname: userDetail.name,
        username: userDetail.username,
        email: userDetail.email,
        phone: userDetail.phone,
        status: userDetail.status,
        dob: userDetail.dob,
        avatar: 'null',
    }
    return result;
}