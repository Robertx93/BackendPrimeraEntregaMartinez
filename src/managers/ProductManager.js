import fs from 'fs';

const path = './products.json';

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path);
            this.products = JSON.parse(data);
        }
    }

    saveProducts() {
        fs.writeFileSync(path, JSON.stringify(this.products, null, 2));
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    addProduct(product) {
        const newId = this.products.length ? Math.max(this.products.map(p => p.id)) + 1 : 1;
        product.id = newId;
        this.products.push(product);
        this.saveProducts();
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            Object.assign(this.products[index], updatedFields);
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }
}

export default ProductManager; 