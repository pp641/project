const mongoose = require("mongoose");
const RecordSchema = require("../../Schema/schema");
const UserSchema = require("../../Schema/account");
const CountRecordsByAllFilterOperations = (req, res) => {
  let searchQueryOperation = {};
  let authorSeachQuery = {};
  let levelSearchQuery = {};
  let batchWiseFilterQuery = {};

  var { searchQuery, authorId, category, x } = req.body.records;

  (batchWiseFilterQuery = { $skip: 90 * (x - 1) }),
    (searchQueryOperation = {
      $match: { $text: { $search: `${searchQuery}` } },
    });

  authorSeachQuery = { $match: { author_id: `${authorId}` } };

  levelSearchQuery = {
    $match: {
      category: category,
    },
  };

  let projection = {
    _id: 0,
    title: 1,
  };
  RecordSchema.aggregate([
    searchQuery ? searchQueryOperation : { $skip: 1 },
    category ? levelSearchQuery : { $skip: 1 },
    authorId ? authorSeachQuery : { $skip: 1 },
    { $group: { _id: null, count: { $sum: 1 } } },
  ])
    .then(async (records) => {
      await res.json(records);
    })
    .catch((err) => {
      res.json({ message: "Error", type: err });
    });
};

const getRecordsByAllFilterOperations = (req, res) => {
  let searchQueryOperation = {};
  let authorSeachQuery = {};
  let levelSearchQuery = {};
  let batchWiseFilterQuery = {};

  console.log(req.body);
  var { searchQuery, authorId, category, x } = req.body;

  (batchWiseFilterQuery = { $skip: 90 * (x - 1) }),
    (searchQueryOperation = {
      $match: { $text: { $search: `${searchQuery}` } },
    });

  authorSeachQuery = { $match: { author_id: `${authorId}` } };

  levelSearchQuery = {
    $match: {
      category: category,
    },
  };

  let projection = {
    _id: 0,
    title: 1,
  };
  RecordSchema.aggregate([
    searchQuery ? searchQueryOperation : { $skip: 1 },
    category ? levelSearchQuery : { $skip: 1 },
    authorId ? authorSeachQuery : { $skip: 1 },
    batchWiseFilterQuery,
    { $limit: 90 },
  ])
    .then((records) => {
      console.log("these", records);
      res.json({ records: records, totalPages: 40000 });
    })
    .catch((err) => {
      res.json({ message: "Error", type: err });
    });
};

const hasUserMarkedCurrentRecord = (req, res) => {
  UserSchema.find({ email: req.body.data.email })
    .then(async (response) => {
      if (!response) {
        return res.json({ message: "Record Dosent Exist" });
      }
      let result = response.hasDone.includes(req.body.data._id);
      return res.json({ result: result });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

module.exports = {
  getRecordsByAllFilterOperations,
  CountRecordsByAllFilterOperations,
  hasUserMarkedCurrentRecord,
};
