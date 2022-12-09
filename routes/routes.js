import express from 'express'
import user from '../controllers/user.js'
import car from '../controllers/car.js';
import rent from '../controllers/rent.js';

const router = express.Router()

//==========================
// User Endpoints
//==========================
router.get('/user', (req, res) => {
    user.get(req, res);
})

router.post('/user', (req, res) => {
    user.post(req, res);
})

//==========================
// Car Endpoints
//==========================
router.get('/car', (req, res) => {
    car.get(req, res);
})

router.post('/car', (req, res) => {
    car.post(req, res);
})

router.patch('/car/:id', (req, res) => {
    car.patch(req, res);
})

router.delete('/car/:id', (req, res) => {
    car.delete(req, res);
})

//==========================
// Rent Endpoints
//==========================
router.get('/rent', (req, res) => {
    rent.get(req, res);
})

router.post('/rent', (req, res) => {
    rent.post(req, res);
})

router.patch('/rent/:id', (req, res) => {
    rent.patch(req, res);
})

router.delete('/rent/:id', (req, res) => {
    rent.delete(req, res);
})

export default router;