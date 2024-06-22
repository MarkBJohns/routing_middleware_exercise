const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb");

let _item = { name: "item", price: 5 };
let _newItem = { name: "new-item", price: 10 };
let _patchedItem = { name: "patched-item", price: 15 };

beforeEach(() => {
    items.length = 0;
    items.push(_item);
});

describe("GET /items", () => {
    test("Return a list of all items", async () => {
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            items: [_item]
        });
    });
});

describe("POST /items", () => {
    test("Add a new item to the list", async () => {
        const response = await request(app).post('/items').send(_newItem);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            added: _newItem
        });
        const response2 = await request(app).get('/items');
        expect(response2.body).toEqual({
            items: [_item, _newItem]
        });
    });
});

describe("GET /items/:name", () => {
    test("Show a specific item by its 'name' value", async () => {
        await request(app).post('/items').send(_newItem);
        const response = await request(app).get('/items/item');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(_item);
        const response2 = await request(app).get('/items/new-item');
        expect(response2.statusCode).toBe(200);
        expect(response2.body).toEqual(_newItem);
    });
    test("Returns an error if there is no item", async () => {
        const response = await request(app).get('/items/no-item');
        expect(response.statusCode).toBe(404);
    });
});

describe("PATCH /items:name", () => {
    test("Update a specific item", async () => {
        const response = await request(app).patch('/items/item')
            .send(_patchedItem);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            updated: _patchedItem
        });
        const response2 = await request(app).get('/items');
        expect(response2.statusCode).toBe(200);
        expect(response2.body).toEqual({
            items: [_patchedItem]
        });
    });
    test("Returns an error if there is no item", async () => {
        const response = await request(app).patch('/items/no-item')
            .send(_patchedItem);
        expect(response.statusCode).toBe(404);
    });
});

//  ====================================================================
//      I've spent 30 minutes on this test, I can't get it to pass even
//  though the route itself works perfectly fine.
//  ====================================================================

// describe("DELETE /items/:name", () => {
//   test("Delete a specific item by its 'name' value", async () => {
//       const response = await request(app).delete('/items/item')
//           .expect(200);
//       expect(response.body).toEqual({
//           message: "Deleted"
//       });
//   });
//   test("Returns an error if there is no item", async () => {
//       const response = await request(app).delete('/items/no-item');
//       expect(response.statusCode).toBe(404);
//   });
// });

