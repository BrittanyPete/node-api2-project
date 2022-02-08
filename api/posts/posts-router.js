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
            console.log('search by id worked')
            res.status(200).json(post)
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
    Posts.findById(id)
})

router.post('/', async (req, res) => {
    try{
        console.log('req:', req.body)
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            const newPost = await Posts.insert(req.body);
            res.status(201).json(newPost);
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
})


module.exports = router;