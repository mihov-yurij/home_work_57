const http = require('node:http');
const querystring = require('node:querystring');
const { generateHTML, sanitize } = require('./js/utils.js');

const PORT = process.env.PORT || 3000;
const MAX_BODY_SIZE = 1024 * 1024; // 1 МБ (Вимога №5)

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Заголовки (Вимога №4)
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    try {
        // GET запити (Вимога №2)
        if (method === 'GET') {
            if (url === '/') return send(res, 200, generateHTML('Home', 'Welcome to the Home Page'));
            if (url === '/about') return send(res, 200, generateHTML('About', 'Learn more about us'));
            if (url === '/contact') return send(res, 200, generateHTML('Contact', 'Get in touch'));
            return send(res, 404, generateHTML('Page Not Found', 'The requested page was not found.'));
        }

        // POST запит /submit (Вимога №3)
        if (method === 'POST' && url === '/submit') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
                if (body.length > MAX_BODY_SIZE) {
                    send(res, 413, '<h1>413 Payload Too Large</h1>');
                    req.destroy();
                }
            });

            req.on('end', () => {
                if (res.writableEnded) return;
                const data = querystring.parse(body);
                // Валідація (Вимога №5)
                if (!data.name || !data.email || !data.name.trim() || !data.email.trim()) {
                    return send(res, 400, '<h1>400 Bad Request</h1><p>Invalid form data</p>');
                }
                // Відповідь з санітизацією (Вимога №5)
                const html = `<h1>Form Submitted</h1><p>Name: ${sanitize(data.name)}</p><p>Email: ${sanitize(data.email)}</p>`;
                send(res, 200, html);
            });
            return;
        }

        send(res, 404, 'Not Found');
    } catch (err) {
        send(res, 500, '<h1>500 Internal Server Error</h1>');
    }
});

function send(res, statusCode, html) {
    const buffer = Buffer.from(html);
    res.statusCode = statusCode;
    res.setHeader('Content-Length', buffer.length);
    res.end(buffer);
}


if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
    });
}

module.exports = server;

