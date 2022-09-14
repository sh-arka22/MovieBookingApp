const userController = require("../controllers/user.controller")
const { authJwt, verifyUser } = require("../middlewares");

module.exports = (app)=>{

    // UPDATE User Password
    app.put("/mba/api/v1/users/", [authJwt.verifyToken, verifyUser.verifyUpdatePasswordRequestBody, verifyUser.validateOldPassword], userController.updatePassword);

    // UPDATE User Data
    app.put("/mba/api/v1/users/:id", [authJwt.verifyToken, verifyUser.isAdminOrValidOwner], userController.updateUser);

}

