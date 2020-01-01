const user = require('./user');

exports.queryAllUsers = async (req, res) => {
    const userQuery = await user.find({});

    const users = userQuery.map(user => ({
        fullname: user.name,
        username: user.username,
        email: user.email,
        phoneNum: user.phone,
        moneySpent: '200,000',
        createAt: new Date(user.createdAt),
    }))
    users[0].dayCreated = `${users[0].createAt.getDate()}/${users[0].createAt.getMonth()+1}/${users[0].createAt.getFullYear()}`;
    return users;
}