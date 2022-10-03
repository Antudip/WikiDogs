const { Breed, conn } = require('../../src/db.js');


// describe('Breed model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Breed.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Breed.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Breed.create({ name: 'Pug' });
//       });
//     });
//   });
// });



describe("Breed model", () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });

  it("No debería crear un objeto vacio", async () => {
    expect.assertions(1); 
    try {
      await Breed.create({});
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("debería crear la raza con la propiedad name", async () => {
    const breed = await Breed.create({
      name: "joakin",
      weight:0,
      height:0,
      image:'ds',

    });
    expect(breed.toJSON()).toHaveProperty("name", "joakin");
  });
  
  it("debería crear la raza con la propiedad weight", async () => {
    const breed = await Breed.create({
      name: "milaneso",
      weight:'56-656',
      height:'234-345',
      image:'image',

    });
    expect(breed.toJSON()).toHaveProperty("weight", "56-656");
  });

  it("debería crear la raza con la propiedad height", async () => {
    const breed = await Breed.create({
      name: "milaneso",
      weight:'56-656',
      height:'234-345',
      image:'image',

    });
    expect(breed.toJSON()).toHaveProperty("height", "234-345");
  });

  it("debería crear la raza con la propiedad image", async () => {
    const breed = await Breed.create({
      name: "milaneso",
      weight:'56-656',
      height:'234-345',
      image:'image',

    });
    expect(breed.toJSON()).toHaveProperty("image", "image");
  });


  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  });
});