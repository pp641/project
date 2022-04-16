const express = require("express");
const router = express.Router();

const { serve } = require("../models/allDetailsModels/fetchScrappedRecord");
const {
  getAllSavedRecordUserWise,
} = require("../models/allDetailsModels/getAllSavedRecordUserWise");
const {
  hasUserMarkedCurrentRecord,
} = require("../models/allDetailsModels/getRecordsByAllFilterOperations");
const { getCurrentUser } = require("../models/authModels/authRecords");
const {
  removeCurrentFavouritePost,
} = require("../models/authModels/removeCurrentFavPost");
const loginIntoAccount =
  require("../models/authModels/authRecords").loginIntoAccount;
const getRecordsCount =
  require("../models/allDetailsModels/getRecordsByAllFilterOperations").CountRecordsByAllFilterOperations;
const sendLikeStatus =
  require("../models/authModels/authRecords").sendLikeStatus;

const isLogin = require("../middleware/isLogin").isLogin;
const createNewAccount =
  require("../models/authModels/authRecords").createNewAccount;
const getRecordsByAllFilterOperations =
  require("../models/allDetailsModels/getRecordsByAllFilterOperations").getRecordsByAllFilterOperations;
const getAllAuthors =
  require("../models/allDetailsModels/getAllAuthors").getAllAuthors;
const getDetails = require("../models/allDetailsModels/getDetails").getData;

router.get("/getAllAuthors", getAllAuthors);
router.post("/getRecordsByFilterOperations", getRecordsByAllFilterOperations);
router.patch("/likeStatus", sendLikeStatus);
router.post("/getRecordCount", getRecordsCount);
router.post("/getCurrentUser", getCurrentUser);
router.post("/createAccount", createNewAccount);
router.post("/loginAccount", loginIntoAccount);
router.post("/hasUserMarked", hasUserMarkedCurrentRecord);
router.get("/userDetails", getDetails);
router.post("/getCurrentPost", serve);
router.post("/getAllSavedRecordUserWise", getAllSavedRecordUserWise);
router.patch("/removeCurrentFavPost", removeCurrentFavouritePost);
module.exports = router;
