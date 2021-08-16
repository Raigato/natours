const express = require("express");

const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/authController");

const {
  getAllUsers,
  createNewUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateOwnUser,
  deleteOwnUser,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(protect);

router.get("/me", getMe, getSingleUser);
router.patch("/update-user", uploadUserPhoto, resizeUserPhoto, updateOwnUser);
router.patch("/update-password", updatePassword);
router.delete("/delete-user", deleteOwnUser);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(getSingleUser)
  .patch(updateSingleUser)
  .delete(deleteSingleUser);

module.exports = router;
