import url from 'url';
import chatModel from '../models/chat.js';

export default {
    get : async (req, res) => {
        const id = req.params.user_id;

        if(id){
                try {
                        const data = await chatModel.find( { 'renter_id': { $in: id } } );

                            if (data) {
                                res.json(data);
                            } else {
                                throw new Error('Chats not found.');
                            }
                        } catch(error){
                            res.status(500).json({message: error.message});
                        }
        }else{
            try {
                const data = await chatModel.find();

                    if (data) {
                        res.json(data);
                    } else {
                        throw new Error('Chat not found.');
                    }
                } catch(error){
                    res.status(500).json({message: error.message});
                }
        }
        
    },
    post: async (req, res) => {

        const data = new chatModel({
            avatar: req.body.avatar,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            renter_id: req.body.renter_id
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