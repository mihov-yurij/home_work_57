const { writeFile, readFile, unlink } = require('node:fs/promises');

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

function generateHTML(title, content) {
    return `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 0; margin: 0; line-height: 1.6; color: #333; background-color: #f0f2f5; }
        nav { background: #007bff; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        nav a { color: white; text-decoration: none; margin-right: 20px; font-weight: bold; transition: opacity 0.2s; }
        nav a:hover { opacity: 0.8; }
        .container { max-width: 800px; margin: 40px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        h1 { color: #007bff; margin-top: 0; border-bottom: 2px solid #f0f2f5; padding-bottom: 10px; }
        .footer { margin-top: 30px; font-size: 0.9rem; color: #777; text-align: center; }
    </style>
</head>
<body>
   <nav>
    <a href="/">Головна</a>
    <a href="/about">Про нас</a>
    <a href="/form">Відправити файл</a>
</nav>

    <div class="container">
        <h1>${title}</h1>
        <div>${content}</div>
        <div class="footer">© 2026 Мій Node.js Сервер</div>
    </div>
</body>
</html>`;
}

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

module.exports = { writeFileAsync, readFileAsync, deleteFileAsync, generateHTML, sanitize };

