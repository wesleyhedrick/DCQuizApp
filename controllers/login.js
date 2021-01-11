const { Users, Progress} = require('../models');
const bcrypt = require('bcryptjs');
const {layout, getSavedData} = require('../utils');

const loginLanding = (req, res) => {
    res.render('login', {...layout})
}

const loginVerify = async (req, res) => {
    const {username, password}  = req.body;
    console.log('Username: ', username)
    console.log('Password: ', password)

    const userObject = await Users.findOne({
        where: {
            username
        }
    })

    if(userObject) {
        const isValid = bcrypt.compareSync(password, userObject.hash);
        req.session.username = username;
        console.log('here is the username stored in session', username)
        if(isValid){
            const savedData = await getSavedData(username);
            console.log('Here is your saved data', savedData);
            res.redirect('home');
        } else {
            res.redirect('/login-error')    
        }

    } else {
        res.redirect('/login-error')
    } 

}

module.exports = {
    loginLanding, 
    loginVerify,
}