const { Temper, conn } = require('../../src/db.js');





describe("Temper model", () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });

  it("No debería crear un objeto vacio", async () => {
    expect.assertions(1); 
    try {
      await Temper.create({});
    } catch (error) {
      expect(error.message).toBeDefined();
    }
  });

  it("debería crear la raza con la propiedad name", async () => {
    const temper = await Temper.create({
      name: "leon",

    });
    expect(temper.toJSON()).toHaveProperty("name", "leon");
  });
  


  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  });
});