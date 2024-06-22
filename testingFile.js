const {
    getItemList, postItem, getItem, patchItem, deleteItem
} = require('./requestFunctions');

const newItem = { name: "new-item", price: 15 };
const patchedItem = { name: "patched-item", price: 20 };

const testRoutes = async () => {
    try {
        console.log('********SHOW ITEMS********');
        console.log(await getItemList());
        
        console.log('********POST ITEMS********');
        console.log(await postItem(newItem));
        console.log('--------------------------');
        console.log(await getItemList());
        
        console.log('********PATCH ITEMS*******');
        console.log(await patchItem('new-item', patchedItem));
        console.log('--------------------------');
        console.log(await getItemList());
        
        console.log('********DELETE ITEMS******');
        console.log(await deleteItem('patched-item'));
        console.log('--------------------------');
        console.log(await getItemList());
        console.log('******************************');
        console.log('******************************');
        
    } catch (err) {
        console.error("Error testing routes", err.mesage);
    }
}

module.exports = testRoutes;