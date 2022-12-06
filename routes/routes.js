import express from 'express'
import user from '../controllers/user.js'

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

export default router;