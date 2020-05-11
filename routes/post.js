const router = require('express').Router()
verify = require('./verifyToken')
router.get('/', verify, (req, res) => {
    res.send(req.user)
    // console.log
    // res.json({
    //     title: "my first post",
    //     decription: "randome data should used without login"
    // })
})
module.exports = router