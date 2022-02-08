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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Posts.findById(id)
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            res.status(201).json(post)
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
    Posts.findById(id)
})


module.exports = router;