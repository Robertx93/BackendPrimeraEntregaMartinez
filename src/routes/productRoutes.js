import express from 'express';
import ProductManager from '../managers/ProductManager.js'; 

const router = express.Router();
const productManager = new ProductManager(); // Instancia única

router.get('/', (req, res) => {
    res.json(productManager.getAllProducts());
});

router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.pid));

    if (product) res.json(product); 
    else res.status(404).send('Producto no encontrado'); 
});

router.post('/', (req, res) => { 
    const newProduct = req.body; // Asegúrate de validar los datos aquí.
    const addedProduct = productManager.addProduct(newProduct); 

    res.status(201).json(addedProduct); 
});

router.put('/:pid', (req, res) => { 
    const updatedProduct = productManager.updateProduct(parseInt(req.params.pid), req.body); 

    if (updatedProduct) res.json(updatedProduct); 
    else res.status(404).send('Producto no encontrado'); 
});

router.delete('/:pid', (req, res) => { 
    const deletedProduct = productManager.deleteProduct(parseInt(req.params.pid)); 

    if (deletedProduct) { 
        res.sendStatus(204); // No Content 
    } else { 
        res.status(404).send('Producto no encontrado'); 
    } 
});

export default router;  