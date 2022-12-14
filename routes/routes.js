import express from 'express'
import user from '../controllers/user.js'
import car from '../controllers/car.js';
import rent from '../controllers/rent.js';
import Stripe from "stripe";

const router = express.Router()

//==========================
// Images Endpoints
//==========================

router.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let car = req.files.car;
            let name = (new Date()).getTime();
            name += ('.' + car.name.split('.').pop());
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            car.mv('./uploads/' + name);

console.log('=============');
console.log(name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: car.name,
                    mimetype: car.mimetype,
                    size: car.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

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

//==========================
// Payment Endpoint
//==========================
const PUBLISHABLE_KEY = "pk_test_51MEhG7Igw91omEHPgyJBmzbmu9a8CF8jIX7aMnAxRPrJ0nEX5R58g2kEOr65RBgF9cFTxQWVt7nJPwdVZjkEHLT300h8Sz10Py"
const SECRET_KEY = "sk_test_51MEhG7Igw91omEHPcgpk2YxPbVSQObGaQbCrkW8jq8wTZ7RAr6Z4hGFR5hknovBjZlwZFb9QTFQb71Z9IJoNmtsr00jPusMqqU"
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

router.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
      console.log(clientSecret)
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });


export default router;