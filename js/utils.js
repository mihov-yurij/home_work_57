const { writeFile, readFile, unlink } = require('node:fs/promises');

// Ваші функції (збережено логіку)
async function writeFileAsync(filename, content) {
    try {
        await writeFile(filename, content, 'utf8');
        console.log('Файл успішно записано');
    } catch (error) {
        console.error('Помилка при записі файлу:', error);
    }
}

async function readFileAsync(filename) {
    try {
        const content = await readFile(filename, 'utf8');
        console.log('Файл успішно прочитано:', content);
        return content;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Файл не існує:', filename);
        } else {
            console.error('Помилка при читанні файлу:', error);
        }
        throw error;
    }
}

async function deleteFileAsync(filename) {
    try {
        await unlink(filename);
        console.log('Файл успішно видалено');
    } catch (error) {
        if (error.code === 'ENOENT') console.error('Файл не існує:', filename);
        else console.error('Помилка при видаленні файлу:', error);
    }
}

// Додано для ТЗ: Генерація HTML (Вимога №2)
function generateHTML(title, content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <p>${content}</p>
</body>
</html>`;
}

// Додано для ТЗ: Санітизація XSS (Вимога №5)
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

module.exports = { writeFileAsync, readFileAsync, deleteFileAsync, generateHTML, sanitize };
