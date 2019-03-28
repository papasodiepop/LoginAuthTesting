const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoURL = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'
const saltRounds = 16

mongodb.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    console.log('DATABASE connection achieved!')
    db.close()
})
router.post('/', (req, res, next) => {
    let password = req.body.password
    console.log(
        'Username: ' +
            req.body.username +
            '\nEmail: ' +
            req.body.email +
            '\nPassword: ' +
            password
    )
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err
        else {
            console.log(
                'Username: ' + req.body.username + '\nPassword: ' + hash
            )
            password = hash
            user = {
                username: req.body.username,
                email: req.body.email,
                password: password
            }
            mongodb.connect(mongoURL, (err, db) => {
                if (err) throw err
                const dbo = db.db('mydb')
                dbo.collection('users').insertOne(user, (err, res) => {
                    if (err) throw err
                    console.log('User added to collection')
                    db.close()
                })
            })
        }
    })
})

module.exports = router
