// implement your posts router here
const router = require('express').Router();

const Posts = require('./posts-model');

router.get('/', (req, res) => {
    console.log('my router is working!');
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({
            message: 'The posts information could not be retrieved.'
        })
    })
});


module.exports = router;