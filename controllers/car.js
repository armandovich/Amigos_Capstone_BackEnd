import userModel from '../models/user.js';
import carModel from '../models/car.js';
import arePointsNear from '../helpers/findPoints.js';
import url from 'url';

export default {
    get : async (req, res) => {
        const queryString = url.parse(req.url, true).query;
        
        try{
            if(queryString.latitude && queryString.longitude) {
                const checkPoint = {lat:Number(queryString.latitude), lng:Number(queryString.longitude)}
                const cars = await carModel.find();
                const points = arePointsNear(checkPoint,cars,10)
                console.log(points)
                //const cars = await userModel.findOne( { email: queryString.email }) ;
                if (points) {
                    res.json(points);
                } else {
                    throw new Error('Cars not found.');
                }
            } else {
                const cars = await carModel.find();
                res.json(cars);
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    post: async (req, res) => {
    
        const data = new carModel({
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            owner_id: req.body.owner_id,
            score: req.body.score,
        })

        try {
            const dataToSave = data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    patch: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
    
            const result = await carModel.findByIdAndUpdate( id, updatedData, options );
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await carModel.findByIdAndDelete(id);
            res.send(`Document with ${data.name} has been deleted..`);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}