const express = require("express");
const ExpressError = require("./ExpressError");
const items = require("./fakeDb");
const testRoutes = require("./testingFile");

const app = express();

app.use(express.json());

app.get('/', async (req, res, next) => {
    await testRoutes();
    return res.json("testing");
})

app.get('/items', (req, res, send) => {
    return res.json({ items });
});

app.post('/items', (req, res, next) => {
    const { name, price } = req.body;
    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
});

app.get('/items/:name', (req, res, next) => {
    const { name } = req.params;
    const item = items.find(i => i.name === name);
    if (!item) {
        return next(new ExpressError("Item is missing", 404));
    }
    return res.json(item);
});

app.patch('/items/:name', (req, res, next) => {
    const { name: oldName } = req.params;
    const { name, price } = req.body;
    
    let item = items.find(i => i.name === oldName);
    if (!item) {
        return next(new ExpressError("Item is missing", 404));
    }
    item.name = name;
    item.price = price;
    
    return res.json({ updated: item });
});

app.delete('/items/:name', (req, res, send) => {
    const { name } = req.params;
    const itemID = items.findIndex(i => i.name === name);
    
    if (itemID === -1) {
        return next(new ExpressError("Item is missing", 404));
    }
    items.splice(itemID, 1);
    
    return res.json({ message: "Deleted" });
});

module.exports = app;