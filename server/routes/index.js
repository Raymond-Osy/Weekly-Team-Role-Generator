const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Team Cosmos API',
        status: 200
    })
})

module.exports = router;