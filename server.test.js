const request = require('supertest');
const http = require('http');
// Импортируем вашу логику сервера. 
// Примечание: для тестов лучше экспортировать объект server из server.js
const server = require('./server.js'); 

describe('HTTP Server API Homework Tests', () => {
    
    // Тест GET маршрутов (Требование №2)
    test('GET / should return Home page', async () => {
        const res = await request(server).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('<h1>Home</h1>');
        expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
    });

    test('GET /about should return About page', async () => {
        const res = await request(server).get('/about');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Learn more about us');
    });

    test('GET /non-existent should return 404', async () => {
        const res = await request(server).get('/random');
        expect(res.statusCode).toBe(404);
        expect(res.text).toContain('Page Not Found');
    });

    // Тест заголовков (Требование №4)
    test('Response should have security headers', async () => {
        const res = await request(server).get('/');
        expect(res.headers['x-content-type-options']).toBe('nosniff');
        expect(res.headers['content-length']).toBeDefined();
    });

    // Тест POST маршрута и валидации (Требование №3 и №5)
    test('POST /submit should process form data', async () => {
        const res = await request(server)
            .post('/submit')
            .send('name=Yuriy&email=test@example.com')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Name: Yuriy');
        expect(res.text).toContain('Email: test@example.com');
    });

    test('POST /submit should return 400 for invalid data', async () => {
        const res = await request(server)
            .post('/submit')
            .send('name=&email=') // Пустые поля
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Invalid form data');
    });

    // Тест безопасности: XSS (Требование №5)
    test('POST /submit should sanitize XSS', async () => {
        const res = await request(server)
            .post('/submit')
            .send('name=<script>alert(1)</script>&email=hacker@test.com')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.text).not.toContain('<script>');
        expect(res.text).toContain('&lt;script&gt;'); // Ожидаем замену символов
    });

    // Тест лимита размера (Требование №5)
    test('POST /submit should return 413 for large payload', async () => {
        const largeData = 'name=' + 'a'.repeat(1024 * 1025); // Больше 1МБ
        const res = await request(server)
            .post('/submit')
            .send(largeData)
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(413);
    });
    afterAll((done) => {
    server.close(done); // Останавливаем сервер после всех тестов
});

});
