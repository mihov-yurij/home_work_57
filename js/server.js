import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileAsync, readFileAsync } from './js/utils.js';

const app = express();
const PORT = 3000;

// Настройка для получения путей в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Позволяет серверу понимать JSON и данные из форм
app.use(express.json());
app.use(express.static(__dirname)); // Отдает наш index.html

// Маршрут для сохранения файла
app.post('/save', async (req, res) => {
    const { filename, content } = req.body;
    try {
        await writeFileAsync(filename, content);
        res.json({ message: 'Файл успешно сохранен на сервере!' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка записи' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
