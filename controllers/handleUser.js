const User = require("../models/User");

const createNewUser = async (req, res) => {
  const username = req.body.username;
  
  try {
    const checkUserDB = await User.findOne({ userName: username});

    if(checkUserDB){
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({username: checkUserDB.userName, _id: checkUserDB._id}));
    }

    const result = await User.create({
      userName: username
    })

    if(result){
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({'username': result.userName, '_id': result._id}));
    }
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}

module.exports = { createNewUser };
