const express = require("express");
const { registerUser, loginUser, deleteUser } = require("../controllers/userAuthentication.jsx");
const handleEmailLinkClick = require("../middleware/handleEmailLinkClick.jsx");
const { handleForgotPasswordClick, changePassword } = require("../controllers/password.jsx");
const isTokenvalid = require("../controllers/isTokenValid.jsx");
const resendEmailVerification = require("../controllers/resendEmailVerification.jsx");
const { checkIfUserIsAnAdminMiddleware } = require("../middleware/adminAuthorisation.jsx");

const router = express.Router();

router.route("/verifyGmail/:task").get(handleEmailLinkClick);
router.route("/isTokenValid").get(isTokenvalid);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/resetPasswordLink/:task").get(handleEmailLinkClick);
router.route("/changePassword").post(changePassword);
router.route("/forgotPasswordClick").post(handleForgotPasswordClick);
router.route("/resendEmailVerificationLink").post(resendEmailVerification);
router.route("/deleteUser").delete(checkIfUserIsAnAdminMiddleware, deleteUser);

module.exports = router;
