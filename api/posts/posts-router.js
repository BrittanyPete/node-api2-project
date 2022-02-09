// implement your posts router here
const router = require('express').Router();

const Posts = require('./posts-model');

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({
            message: 'The posts information could not be retrieved.',
            error: error.message,
            stack: error.stack
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
            res.status(200).json(post)
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The post information could not be retrieved',
            error: error.message,
            stack: error.stack
        })
    }
    Posts.findById(id)
});

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    try{
        if (!title || !contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            Posts.insert({title, contents})
                .then(({id}) => {
                    return Posts.findById(id)
                })
                .then(newPost => {
                    res.status(201).json(newPost)
                })
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    try {
        const post = await Posts.findById(id)
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            if (!title || !contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                const updatedPost = await Posts.update(id, { title, contents });
                res.status(200).json(updatedPost);
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The post information could not be modified'
        })
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id)
        if (post == null) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
            return;
        } else {
            const deletedPost = await Posts.remove(id);
            res.json(deletedPost);
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The post could not be removed'
        })
    }
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        if (!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            const postComment = await Posts.findCommentById(id);
            res.status(200).json(postComment);         
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'The comments information could not be retrieved'
        })
    }
})


module.exports = router;