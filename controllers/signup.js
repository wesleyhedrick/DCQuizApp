const { Users } = require('../models');
const bcrypt = require('bcryptjs')
const {layout} = require('../utils')

const signupOffer = (req, res) => {
    res.render('sign-up')
}

const createUser = async (req, res) => {
    const {first, last, username, password, email} = req.body; 
    
    // const salt = bcrypt.genSaltSync(10); // 10 is good. 20 is too high. 5 is too low.
    const hash = bcrypt.hashSync(password, 10);
   
    try {
        const newUser = await Users.create({
            first,
            last,
            username,
            hash, 
            email
        })
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
        res.redirect('/signup/user-exists');
        }
    }    
    res.redirect('/')

}

const userNameExists = (req, res) => {
    res.render('user-exists', {...layout})
}

module.exports = {
    signupOffer,
    createUser, 
    userNameExists
}

