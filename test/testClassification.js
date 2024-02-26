import classifyItem from "../src/classification/classifyItem.js";

const inputItem = [{
    // store: "Fortinos", 
    "item_key": "06038318640",
    "item_desc": "PCO CREMINI 227",
    "price": "1.99"
}];

classifyItem(inputItem)
    .then(classifiedItem => console.log(classifiedItem))
    .catch(error => console.error(error));