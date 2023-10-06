const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get('/rickandmorty/character/1').expect(200);
    });

    it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
      const response = await agent.get('/rickandmorty/character/1');
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("species");
      expect(response.body).toHaveProperty("gender");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("origin");
      expect(response.body).toHaveProperty("image");
    });

    it("Si hay un error responde con status: 500", async () => {
      await agent.get('/rickandmorty/character/999999').expect(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Debería responder con access: true si las credenciales son correctas", async () => {
      const response = await agent.get('/rickandmorty/login?email=test@example.com&password=password');
      expect(response.body).toEqual({ access: true });
    });

    it("Debería responder con access: false si las credenciales son incorrectas", async () => {
      const response = await agent.get('/rickandmorty/login?email=test@example.com&password=incorrectpassword');
      expect(response.body).toEqual({ access: false });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Debería devolver el body en un arreglo", async () => {
      const response = await agent.post('/rickandmorty/fav').send({ name: "Rick Sanchez" });
      expect(response.body).toEqual([{ name: "Rick Sanchez" }]);
    });

    it("Debería agregar un nuevo elemento al arreglo si se envía otro elemento por body", async () => {
      await agent.post('/rickandmorty/fav').send({ name: "Morty Smith" });
      const response = await agent.post('/rickandmorty/fav').send({ name: "Rick Sanchez" });
      expect(response.body).toEqual([{ name: "Morty Smith" }, { name: "Rick Sanchez" }]);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Debería mantener los elementos previos sin modificar si el ID no existe", async () => {
      const response = await agent.delete('/rickandmorty/fav/999999');
      expect(response.body).toEqual([{ name: "Morty Smith" }, { name: "Rick Sanchez" }]);
    });

    it("Debería eliminar correctamente al personaje si el ID existe", async () => {
      const response = await agent.delete('/rickandmorty/fav/1');
      expect(response.body).toEqual([{ name: "Morty Smith" }]);
    });
  });
});
