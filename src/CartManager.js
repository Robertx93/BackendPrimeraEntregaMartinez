import fs from "fs";

class CartManager {
    constructor() {
        this.path = "./src/carts.json";
    }

    generateNewId = (carts) => {
        if (carts.length > 0) {
            return carts[carts.length - 1].id + 1;
        } else {
            return 1;
        }
    };

    addCart = async () => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);
        const id = this.generateNewId(carts);
        carts.push({ id, products: [] });
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");
        return carts;
    };

    createCart = async () => {
        const carts = await this.addCart();
        return carts[carts.length - 1];
    };

    getCarts = async () => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(cartsJson);
    };

    getCartById = async (cartId) => {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cartId);
        return cart;
    };

    getProductsInCartById = async (cid) => {
        const cartsJson = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(cartsJson);
        const cart = carts.find((cartData) => cartData.id == cid);
        return cart ? cart.products : [];
    };

    addProductToCart = async (cartId, productId) => {
        const cartsJson = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartsJson);
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado");
        }
        const productIndex = carts[cartIndex].products.findIndex(product => product.product === productId);
        if (productIndex !== -1) {
            carts[cartIndex].products[productIndex].quantity += 1;
        } else {
            carts[cartIndex].products.push({ product: productId, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8");

        return carts[cartIndex]; 
    };
}

export default new CartManager();