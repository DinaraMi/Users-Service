const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./logger');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/users_service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(bodyParser.json());
app.use(requestLogger);
// Использование маршрутов пользователя
app.use('/', userRoutes);

app.use(errorLogger);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Users Service is running on port ${PORT}`);
});
