import { processItem } from "../src/main.js";

const inputItem = [{
    // store: "Fortinos", 
    "item_key": "06038318640",
    "item_desc": "PCO CREMINI 227",
    "price": 1.99
}];

const newInputItem = [
    {
        "item_key": "06038318916",
        "item_desc": "PC ITAL SAUS",
        "price": 4.29,
        "taxed": false
    },
    {
        "item_key": "08390000636",
        "item_desc": "NESTEA ICED TEA",
        "price": 3.79,
        "taxed": false
    },
    {
        "item_key": "06905212968",
        "item_desc": "PBRY PPOP PEPPRN",
        "price": 7.99,
        "taxed": false
    },
    {
        "item_key": "06038318640",
        "item_desc": "PCO CREMINI 227",
        "price": 1.99,
        "taxed": false
    },
    {
        "item_key": "2003040",
        "item_desc": "LEAN GRND BEEF",
        "price": 7.2,
        "taxed": false
    }
]

processItem(newInputItem)
    .then(result => console.log(result))
    .catch(error => console.error(error));