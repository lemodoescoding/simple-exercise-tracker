const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const http = require('http');

const storeExercise = async (req, res) => {
  const userId = req.params._id;

  let { description, duration, date } = req.body;
  const checkValidDate = /(\d{4})\-(0[1-9]|1[1-2])\-(0[1-9]|[12]\d|3[01])/g;

  if(`${date}`.length > 0 && !`${date}`.match(checkValidDate)){
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({'error': 'invalid date'}));
  }

  try {
    const checkId = await User.findById(userId);

    if(!checkId){
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({'error': 'invalid user id'}));
    }

    const result = await Exercise.create({
      userName: checkId.userName,
      description: description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date(),
    })

    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      'username': result.userName,
      'description': result.description,
      'duration': result.duration,
      'date': result.date.toDateString(),
      '_id': checkId._id,
    }))
  } catch(err){
    console.error(err);
  }
}

const searchExerciseLog = async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const checkId = await User.findById(userId);

    if(!checkId){
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({"error": "invalid user id"}));
    }
    
    let dateSort = {}
    if(from){
      dateSort["$gte"] = new Date(from);
    }

    if(to){
      dateSort["$lte"] = new Date(to);
    }

    let filterObj = {
      userName: checkId.userName,
    }

    if(from || to){
      filterObj.date = dateSort;
    }

    const exerciseLogs = [];
    let searchLogs;

    if(limit === undefined){
      searchLogs = await Exercise.find(filterObj);
    }

    searchLogs = await Exercise.find(filterObj).limit(parseInt(limit));

    searchLogs.map(doc => {
      exerciseLogs.push({
        'description': doc.description,
        'duration': doc.duration,
        'date': new Date(doc.date).toDateString()
      })
    })

    let finalRes = {
      "_id": checkId._id,
      "username": checkId.userName,
      "count": exerciseLogs.length,
      "log": exerciseLogs
    }

    res.setHeader('Content-Type', 'application/json');
    return res.json(finalRes);
  } catch(err){
    console.error(err);
  }
}

module.exports = { storeExercise, searchExerciseLog };
