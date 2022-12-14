import carModel from '../models/car.js';
import arePointsNear from '../helpers/findPoints.js';
import url from 'url';

export default {
    get : async (req, res) => {
        const queryString = url.parse(req.url, true).query;
        
        try{
            if(queryString.latitude && queryString.longitude) {
                const checkPoint = {lat:Number(queryString.latitude), lng:Number(queryString.longitude)}
                const cars = await carModel.find({'available' : true});
                const points = arePointsNear(checkPoint,cars,10)
                console.log(points)
                
                //const cars = await userModel.findOne( { email: queryString.email }) ;

                if(cars) {
                    if (points) {
                        res.json(points);
                    }
                }
                else {
                    throw new Error('Cars not found.');
                }
            } else {
                const cars = await carModel.find({ 'available' : true});
                res.json(cars);
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    getByUser : async (req, res) => {
        const id = req.params.user_id;

        try {
            const data = await carModel.find( { 'owner_id': { $in: id } , 'available' : true });

            if (data) {
                res.json(data);
            } else {
                throw new Error('Cars not found.');
            }
        } catch(error){
            res.status(500).json({message: error.message});
        }        
    },
    post: async (req, res) => {
    
        const carTemp = JSON.parse(req.body.car);
 
        const carImg = req.files.photo;
        let carImgName = (new Date()).getTime();
        carImgName += ('.' + carImg.name.split('.').pop());

        await carImg.mv('./public/uploads/cars/' + carImgName);
        
        const data = new carModel({
            photo: carImgName,
            name: carTemp.name,
            brand: carTemp.brand,
            price: carTemp.price,
            address: carTemp.address,
            latitude: carTemp.latitude,
            longitude: carTemp.longitude,
            doors: carTemp.doors,
            seats: carTemp.seats,
            fuel: carTemp.fuel,
            transmition: carTemp.transmition,
            tires: carTemp.tires,
            cc: carTemp.cc,
            max_speed: carTemp.max_speed,
            score: 0,
            reviews: 0,
            owner_id: carTemp.owner_id,
            available: true
        })

        try {
            const dataToSave = await data.save();

            if(dataToSave) {
                console.log(dataToSave)
                res.status(200).json(dataToSave)
            }
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    patch: async (req, res) => {
        try {
            const id = req.params.id;
            const options = { new: true };
            const carTemp = JSON.parse(req.body.car);
            let carImgName = carTemp.photo;

            if(req.files && req.files.photo) {
                const carImg = req.files.photo;
                carImgName = (new Date()).getTime();
                carImgName += ('.' + carImg.name.split('.').pop());

                carImg.mv('./public/uploads/cars/' + carImgName);
            }
            
            const data = {
                photo: carImgName,
                name: carTemp.name,
                brand: carTemp.brand,
                price: carTemp.price,
                address: carTemp.address,
                latitude: carTemp.latitude,
                longitude: carTemp.longitude,
                doors: carTemp.doors,
                seats: carTemp.seats,
                fuel: carTemp.fuel,
                transmition: carTemp.transmition,
                tires: carTemp.tires,
                cc: carTemp.cc,
                max_speed: carTemp.max_speed,
                score: carTemp.score,
                reviews: carTemp.reviews,
                owner_id: carTemp.owner_id,
            }

            const result = await carModel.findByIdAndUpdate( id, data, options );
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            //const data = await carModel.findByIdAndDelete(id);
            const data = await carModel.findByIdAndUpdate( id, { available: false }, { new: true } );
            res.send(`Document with ${data.name} has been deleted..`);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}