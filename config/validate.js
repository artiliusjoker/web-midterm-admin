const validate = {};

validate.isLoggedIn = function(req){
    if(req.isAuthenticated()){
        return true;
    }
    return false;
};

module.exports = validate;