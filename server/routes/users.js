const { Router } = require('express');
const {Team} = require('../models');

const  router = Router();

router.get('/users', (req, res) => {
  Team.findAll().then((teamMembers) => {
    return res.status(200).json({
      status: 200,
      data: teamMembers
    })
  })
    .catch((err) => {
      console.log(err);
    })
})

router.get('/users/:id', (req, res) => {
    Team.findByPk(req.params.id)
      .then((user) => {
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
        .catch((err) => {
          return res.status(500)
            .json({
              status: 500,
              error: 'Server error'
          })
      })
})

router.patch('/users/:id', (req, res) => {
    Team.findByPk(req.params.id)
      .then((user) => {
        if (user) {
          const { served, termStartDate, termEndDate, role } = req.body;
          user.served = served || user.served;
          user.termStartDate = new Date() || user.termStartDate;
          user.termEndDate = termEndDate || user.termEndDate;
          user.role = role || user.role;

          return res.status(200)
            .json({
              status: 200,
              data: [user]
            })
      }
    })
    return res.status(404)
      .json({
          status: 404,
          error: 'User does not exist'
      })
});

module.exports = router;
