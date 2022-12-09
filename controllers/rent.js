import rentModel from '../models/rent';
import url from 'url';

export default {
    get : async (req, res) => {
        const queryString = url.parse(req.url, true).query;
        
        try{
            if(queryString.owner_id) {
                const rents = await rentModel.find( { owner_id: queryString.owner_id }) ;
                if (rents) {
                    res.json(points);
                } else {
                    throw new Error('Rents not found.');
                }
            }else if(queryString.renter_id){
                const rents = await rentModel.find( { renter_id: queryString.renter_id }) ;
                if (rents) {
                    res.json(points);
                } else {
                    throw new Error('Rents not found.');
                }
            }else {
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
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            owner_id: req.body.owner_id,
            renter_id: req.body.renter_id,
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