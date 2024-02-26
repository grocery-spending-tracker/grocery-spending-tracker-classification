import { processItem } from "../src/main.js";

const inputItem = [{
    // store: "Fortinos", 
    "item_key": "06038318640",
    "item_desc": "PCO CREMINI 227",
    "price": "1.99"
}];

processItem(inputItem)
    .then(result => console.log(result))
    .catch(error => console.error(error));