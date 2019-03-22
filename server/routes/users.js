const { Router } = require('express');
const Users = require('../models/users');

const  router = Router();

router.get('/users', (req, res) => {
    return res.status(200).json({
        status: 200,
        data: Users
    })
})

router.get('/users/:id', (req, res) => {
    const user = Users.find((user) => user.id === req.params.id * 1);
    if (user) {
        return res.status(200)
          .json({
            status: 200,
            data: [user]
          })
    }

    return res.status(404)
      .json({
          status: 404,
          error: 'User does not exist'
      })
})

router.patch('/users/:id', (req, res) => {
    const user = Users.find((user) => user.id === req.params.id * 1);
    if (user) {
        const { served, termStartDate, termEndDate, role } = req.body;
        user.served = served || user.served;
        user.termStartDate = termStartDate || user.termStartDate;
        user.termEndDate = termEndDate || user.termEndDate;
        user.role = role || user.role;

        return res.status(200)
          .json({
            status: 200,
            data: [user]
          })
    }

    return res.status(404)
      .json({
          status: 404,
          error: 'User does not exist'
      })
});

module.exports = router;
