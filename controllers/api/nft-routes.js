const router = require('express').Router();
const { User, Comment } = require('../../models');

router.post('/employee', async (req, res, next) => {
  try {
    const name = req.body.employee.name;
    const position = req.body.employee.position;
    const email = req.body.employee.email;
    const wage = req.body.employee.wage;
    console.log(name);
    if (!name || !position || !wage) {
      return res.sendStatus(400);
    }

    const employee = await insertEmployee(
      name,
      position,
      email,
      wage
    ).then(() => res.json({ message: 'Employee created.' }));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

//get all the Galleries
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get gallery by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'user_id'],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: 'No Post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add post
router.post('/', (req, res) => {
  // This will make a new post
  // Expects Title, body, user_id
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});
//update post
router.put('/:id', (req, res) => {
  console.log('The id is ', req.params.id);
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: 'No Post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
//remove post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: 'No Post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
