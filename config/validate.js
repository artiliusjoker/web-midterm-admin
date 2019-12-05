const validate = {};

validate.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return true;
    }
    return false;
};

module.exports = validate;