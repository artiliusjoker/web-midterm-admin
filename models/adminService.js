const bcrypt = require('bcrypt');
const Admin = require('./admin');

var service = {};

service.createAdmin = async (body) =>{
    const admin = new Admin({
        email: body.email,
        password : body.password,
	    username: body.username,
	    fullname: body.fullname,
	    phone: body.phone,
    });
    await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(admin.password, salt, function (err, hash) {
            admin.password = hash;
            admin.save();
        });
    });
    return true;
};

service.validatePass = (password, passHash, callback) => {
    //bcrypt.compare(password, passHash, function(err, res){
    //    if(err) throw err;
    //    callback(null, res);
    //});
    let res;
    if(password == passHash) res = true;
    else res = false;
    callback(null, res); 
};

service.findByEmail = (email, callback) => {
    Admin.findOne({email : email}, callback);
};

service.findByUname = (username, callback) => {
    Admin.findOne({username : username}, callback);
};

module.exports = service;