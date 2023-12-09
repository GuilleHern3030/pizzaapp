export default class Article {

    #data;

    constructor(article) {
        if (typeof(article) == 'object') this.#data = article;
        else throw Error("invalid article");
    }

    // Getters
    id = () => Number(this.#data['id']);

    category = () => this.#data['category'];

    name = () => this.#data['name'];

    price = () => this.#data['price'];

    coinSymbol = () => this.#data['coin'] != undefined ? this.#data['coin'] : "$";

    description = () => this.#data['description'];

    register = () => this.#data['register'];

    amount = () => Number(this.#data['amount']);
    
    _amount = () => this.#data['amount'];

    img = () => this.#data['imageuri'] == null ? this.#data['name'] : this.#data['imageuri'];

    details = () => this.#data['details'];

    amountSelected = () => this.#data['amountSelected'] ? this.#data['amountSelected'] : 0;

    // Methods
    outOfStock = () => this.#data['amount'] == 0 || this.#data['amount'] < 0;
    data = () => { return {...this.#data} }

}

export const createArticle = (id, category, name, price, coin, description, register, amount, imageuri, details) =>
    new Article(
        { 
            id, 
            category, 
            name, 
            price: typeof price === 'number' ? price : null, 
            coin: coin == '' || typeof coin != 'string' ? "$" : register, 
            description: description == '' ? null : description, 
            register: register == '' ? null : register, 
            amount: typeof amount === 'number' ? amount : null, 
            imageuri: imageuri == '' ? null : imageuri, 
            details: details == '' ? null : details 
        }
    )