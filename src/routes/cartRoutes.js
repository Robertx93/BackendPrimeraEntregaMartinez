import express from 'express';
import CartManager from '../managers/CartManager.js'; 

const router = express.Router();
const cartManager = new CartManager(); // Instancia única

router.post('/', (req, res) => { 
    const newCart = cartManager.createCart(); 

    res.status(201).json(newCart);  
});

router.get('/:cid', (req, res) => { 
    const cart = cartManager.getCartById(parseInt(req.params.cid)); 

    if(cart){ 
        res.json(cart);  
    } else {  
        res.status(404).send('Carrito no encontrado');  
    }  
});

router.post('/:cid/product/:pid', (req, res) => {  
    const updatedCart=cartManager.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid));   

    if(updatedCart){  
        res.json(updatedCart);  
    } else {  
        res.status(404).send('Carrito no encontrado');  
    }  
});

export default router;  