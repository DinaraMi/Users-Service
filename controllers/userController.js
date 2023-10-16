const axios = require('axios');
const User = require('../models/User');

// Создание пользователя
module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      axios.post('http://localhost:3001/record-action', {
        userId: user._id,
        actionType: 'user_created',
        timestamp: new Date(),
      })
      .then(() => {
        res.status(201).send(user);
      })
      .catch(err => {
        console.error('Error while sending action to history service:', err);
        res.status(201).send(user);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};


// Изменение пользователя
module.exports.editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, req.body);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Отправить событие в Сервис Истории Действий
    await axios.post('http://localhost:3001/record-action', {
      userId: userId,
      actionType: 'user_updated',
      timestamp: new Date(),
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Получение списка пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
