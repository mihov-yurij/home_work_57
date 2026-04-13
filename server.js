const http = require('node:http');
const querystring = require('node:querystring');
const { generateHTML, sanitize } = require('./js/utils.js');

const PORT = process.env.PORT || 3000;
const MAX_BODY_SIZE = 1024 * 1024; 

const server = http.createServer(async (req, res) => { 
    const { method, url } = req;

   
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    try {
     
              // GET запити (Вимога №2)
        if (method === 'GET') {
            if (url === '/') {
                return send(res, 200, generateHTML('Головна', 'Вітаємо на головній сторінці нашого сервера!'));
            }
            
            if (url === '/about') {
                return send(res, 200, generateHTML('Про нас', 'Цей проект створений для демонстрації навичок роботи з Node.js.'));
            }
            
            if (url === '/contact') {
                return send(res, 200, generateHTML('Контакти', 'Зв’яжіться з нами через форму на сторінці /form або за імейлом.'));
            }

            // Маршрут для вашої HTML-форми (index.html)
            if (url === '/form') {
                try {
                    const { readFile } = require('node:fs/promises');
                    const path = require('node:path');
                    // Читаємо ваш файл index.html
                    const formHtml = await readFile(path.join(__dirname, 'index.html'), 'utf8');
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end(formHtml);
                } catch (err) {
                    return send(res, 500, generateHTML('Помилка', 'Не вдалося завантажити файл форми.'));
                }
            }

            
            return send(res, 404, generateHTML('404 - Не знайдено', 'На жаль, такої сторінки не існує.'));
        }


       
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
               
                if (!data.name || !data.email || !data.name.trim() || !data.email.trim()) {
                    return send(res, 400, '<h1>400 Bad Request</h1><p>Invalid form data</p>');
                }
           
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

server.on('connection', (socket) => {
    socket.unref(); 
});


server.on('connection', (socket) => {
    socket.unref(); 
});



module.exports = server;

