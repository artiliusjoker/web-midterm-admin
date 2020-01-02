const user = require('./user');

exports.queryAllUsers = async (req, res) => {
    const userQuery = await user.find({});

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