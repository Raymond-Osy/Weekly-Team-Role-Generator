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

router.patch('/users/:id', async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);
  const { served, startDate, endDate, role} = req.body;
  const updatedTeamMember = await teamMember.update({
        served: served || teamMember.served,
        startDate: new Date() || teamMember.termStartDate,
        endDate: endDate || teamMember.endDate,
        role: role || teamMember.role
    })
    return res.status(200)
      .json({
        status: 200,
        data: [updatedTeamMember]
      })
  } catch(e) {
    return res.status(500)
      .json({
          status: 500,
          error: 'Invalid request'
      })
  }
});

module.exports = router;
