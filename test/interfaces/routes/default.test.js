const request = require('supertest');
const Server = require("../../../src/infrastructure/webserver/server");
const server = new Server();


describe('GET /', function() {
    
    test('Debe responder ready to play', async()=> {
      return request(server.app)
        .get('/')
        .expect('Content-Type', /json/)
         .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toEqual({"msg": "Ready to play ..."});
            })
    });

    test('Debe responder ups ..', async()=> {
        return request(server.app)
          .get('/testotro')
          .expect('Content-Type', /json/)
           .expect(200)
              .then((res) => {
                  expect(res.statusCode).toBe(200);
                  expect(res.body).toEqual({"msg": "ups this fight is not ready yet..."});
              })
      });
  });



  