/* eslint-disable import/no-extraneous-dependencies */
const  request = require("supertest");
const app = require("../../src/app.js");
const { Breed, conn } = require("../../src/db.js");
const agent = request(app);



const breed = {
  name: 'doberman',
  weight: 22,
  height:22,
  image: 'ds',
};
const namelessBreed = {
  name: '',
  weight: 22,
  height: 22,
  image: 'ds',
};

const enano = {
  name: 'Super Mario Bros',
  weight: 22,
  height: 0,
  image: 'ds',
};

describe('Breed routes', () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });


  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(breed)));
  describe('GET /breed', () => {
    it('should get 200', async () =>
      await agent.get('/breed')
        .expect(200)
    );
  });
  describe('POST /breed', () => {
    it('No debería permitir crear un Breed sin name', async () =>
      await agent.post('/breed')
        .send(namelessBreed)
        .expect(400)
    );
    it('No debería permitir crear un Breed sin Height', async () =>
      await agent.post('/breed')
        .send(enano)
        .expect(400)
    );
    afterAll(async () => {
      await conn.sync({ force: true });
      conn.close();
    });
  });
});