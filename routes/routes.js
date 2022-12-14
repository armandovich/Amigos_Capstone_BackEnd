import express from 'express'
import user from '../controllers/user.js'
import car from '../controllers/car.js';
import rent from '../controllers/rent.js';
import Stripe from "stripe";

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

router.get('/car/:user_id', (req, res) => {
    car.getByUser(req, res);
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
    const queryString = url.parse(req.url, true).query;

    try {
      let amnt = queryString.amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amnt, //lowest denomination of particular currency
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