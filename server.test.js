const request = require('supertest');
const http = require('http');
const server = require('./server.js'); 

describe('HTTP Server API Homework Tests', () => {    
    
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
    
    test('Response should have security headers', async () => {
        const res = await request(server).get('/');
        expect(res.headers['x-content-type-options']).toBe('nosniff');
        expect(res.headers['content-length']).toBeDefined();
    });

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
            .send('name=&email=') 
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Invalid form data');
    });

        test('POST /submit should sanitize XSS', async () => {
        const res = await request(server)
            .post('/submit')
            .send('name=<script>alert(1)</script>&email=hacker@test.com')
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.text).not.toContain('<script>');
        expect(res.text).toContain('&lt;script&gt;'); 
    });

    
    test('POST /submit should return 413 for large payload', async () => {
        const largeData = 'name=' + 'a'.repeat(1024 * 1025); // Больше 1МБ
        const res = await request(server)
            .post('/submit')
            .send(largeData)
            .set('Content-Type', 'application/x-www-form-urlencoded');

        expect(res.statusCode).toBe(413);
    });
   afterAll((done) => {
    if (server && server.close) {
        server.close(() => {
            done();
        });
    } else {
        done();
    }
});


});
