const express = require('express')
const request = require('supertest');
const translate = require('../routes/translate')
const app = express();

app.use(express.json())
app.use('/', translate);

jest.useRealTimers();

describe("Test the /test path", () => {
    test("It should response the GET method", async() => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
    })
});

describe("Test the /translate path", () => {
    test("It should response the GET method", done=> {
        // jest.setTimeout(20000);
        request(app)
            .get('/translate')
            .query({
                yourText: 'Hello Good Morning',
                targetLanguage: 'hi'
            })
        .then( response => {
            expect(response.statusCode).toBe(200);
             done();
        })
        
    }, 20000);
});