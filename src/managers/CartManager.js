import fs from 'fs';

const path = './carts.json';

class CartManager {
    constructor() {
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path);
            this.carts = JSON.parse(data);
        }
    }

    saveCarts() {
        fs.writeFileSync(path, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        const newCart = { id: Date.now(), products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);

        if (cart) { 
            const existingProductIndex = cart.products.findIndex(p => p.product === productId); 
            if (existingProductIndex > -1) { 
                cart.products[existingProductIndex].quantity += 1; // Incrementar cantidad si ya existe. 
            } else { 
                cart.products.push({ product: productId, quantity: 1 }); 
            } 
            this.saveCarts(); 
            return cart; 
        } 

        return null; 
    } 
}

export default CartManager; 