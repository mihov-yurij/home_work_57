import express from 'express';
import { writeFileAsync } from './js/utils.js';

const app = express();
app.use(express.json());
app.use(express.static('./')); // Чтобы браузер видел ваш index.html

// Маршрут для сохранения
app.post('/save', async (req, res) => {
    const { filename, content } = req.body;
    await writeFileAsync(filename, content);
    res.json({ message: 'Файл збережено успішно!' });
});

app.listen(3000, () => {
    console.log('🚀 Сервер запущен: http://localhost:3000');
});
