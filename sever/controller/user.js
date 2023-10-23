const User = require('../model/user')


exports.login = async (req, res, next) => {
    await User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Not Found User!' });
            }
            if(user.password !==  req.body.password) {
                return res.status(401).json({ message: 'Password Incorrect!' });
            }
            else {
                return res.status(200).send(user)
            }
          })
          .catch(err => console.log(err))
        
    
};

exports.adminLogin = async (req, res, next) => {
    await User.findOne({
        username: req.body.username,
        isAdmin: true
    })
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'Not Found Admin!' });
            }
            if(user.password !==  req.body.password) {
                return res.status(401).json({ message: 'Password Incorrect!' });
            }
            else {
                return res.status(200).send(user)
            }
          })
          .catch(err => console.log(err))
        
    
};

exports.logout = (req, res, next) => {
    req.user = null;
    res.status(200).send(req.user)
};

exports.signUp = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if(user) {
        return res.status(404).json({ message: 'Username Already Exists!' });
    }
    else {
        const newUser = new User(req.body);
        newUser.save()
            .then(results => {
                console.log('ADDED USER: ',results);
                res.status(200).end();
            })
            .catch(err => console.log(err));
    }
};

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => console.log(err))
}

exports.getAdminUsers = async (req, res, next) => {
    const limit = req.query.limit;
    const page = req.query.page ? req.query.page : 1
    const skip = (page - 1) * limit
    
    const count = await User.find().then(users => {
        return users.length
    })

    User.find().limit(limit).skip(skip)
        .then(users => {
            res.json({
                users: users,
                count: count
            });
        })
        .catch(err => console.log(err));
}