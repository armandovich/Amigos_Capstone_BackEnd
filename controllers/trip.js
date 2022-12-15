import url from 'url';
import tripModel from '../models/trip.js';

export default {
    get : async (req, res) => {
        const id = req.params.user_id;

        try {
            const data = await tripModel.find( { 'renter_id': { $in: id } } );

            if (data) {
                res.json(data);
            } else {
                throw new Error('Trips not found.');
            }
        } catch(error){
            res.status(500).json({message: error.message});
        }
    },
    post: async (req, res) => {
    
        const tempStart = new Date(req.body.start_date);
        const tempEnd = new Date(req.body.end_date);
    
        const data = new tripModel({
            car_id: req.body.car_id,
            car_owner_id: req.body.car_owner_id,
            car_name: req.body.car_name,
            car_brand: req.body.car_brand,
            car_photo: req.body.car_photo,
            renter_id: req.body.renter_id,
            cost: req.body.cost,
            start_date: tempStart,
            end_date: tempEnd,
        })
    
        try {
            const dataToSave = data.save();
            res.status(200).json(dataToSave);
        }
        catch (error) {
            res.status(400).json({message: error.message});
        }
    },
}