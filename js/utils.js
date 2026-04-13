const { writeFile, readFile, unlink } = require('node:fs/promises');

async function writeFileAsync(filename, content) {
    try {
        await writeFile(filename, content, 'utf8');
        console.log('Файл успішно записано'); // Оставляем для теста
    } catch (error) {
        console.error('Помилка при записі файлу:', error);
    }
}

async function readFileAsync(filename) {
    try {
        const content = await readFile(filename, 'utf8');
        console.log('Файл успішно прочитано:', content); // Оставляем для теста
        return content;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Файл не існує:', filename); // Оставляем для теста
        } else {
            console.error('Помилка при читанні файлу:', error);
        }
        throw error;
    }
}

async function deleteFileAsync(filename) {
    try {
        await unlink(filename);
        console.log('Файл успішно видалено'); // Оставляем для теста
    } catch (error) {
        if (error.code === 'ENOENT') console.error('Файл не існує:', filename);
        else console.error('Помилка при видаленні файлу:', error);
    }
}

// Улучшенная генерация HTML (Вимога №2)
function generateHTML(title, content) {
    return `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: sans-serif; padding: 40px; line-height: 1.6; color: #333; background-color: #f4f4f9; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        a { display: inline-block; margin-top: 20px; color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        <div>${content}</div>
        <a href="/">← На головну</a>
    </div>
</body>
</html>`;
}

// Улучшенная санітизація (Вимога №5)
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;"); // Теперь защищает и от кавычек
}

module.exports = { writeFileAsync, readFileAsync, deleteFileAsync, generateHTML, sanitize };

