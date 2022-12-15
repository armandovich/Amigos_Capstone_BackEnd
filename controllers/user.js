import url from 'url';
import bcrypt from 'bcrypt';
import userModel from '../models/user.js';

const salt = bcrypt.genSaltSync(10);

export default {
    get : async (req, res) => {
        const queryString = url.parse(req.url, true).query;
        
        try{
            if(queryString.email) {
                const user = await userModel.findOne( { email: queryString.email }) ;
                if (user && bcrypt.compareSync(queryString.password, user.password)) {
                    res.json(user);
                } else {
                    throw new Error('User not found.');
                }
            } else {
                const user = await userModel.find();
                res.json(user);
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    getByUser : async (req, res) => {
        const id = req.params.user_id;

        try {
            const data = await userModel.find( { '_id': { $in: id }});

            if (data) {
                res.json(data);
            } else {
                throw new Error('Users not found.');
            }
        } catch(error){
            res.status(500).json({message: error.message});
        }        
    },
    post : async (req, res) => {
        const userTemp = JSON.parse(req.body.user);
 
        const avatarImg = req.files.avatar;
        let avatarName = (new Date()).getTime();
        avatarName += ('.' + avatarImg.name.split('.').pop());

        avatarImg.mv('./public/uploads/avatars/' + avatarName);
        
        const hash = await bcrypt.hashSync(userTemp.password, salt);

        const data = new userModel({
            avatar: avatarName,
            first_name: userTemp.first_name,
            last_name: userTemp.last_name,
            country: userTemp.country,
            email: userTemp.email,
            password: hash,
            admin: false
        })

        try {
            const user = await userModel.find( { email: userTemp.email });
            
            if(user) {
                if (user.length > 0) {
                    throw new Error('Email has been used.');
                } else {
                    const dataToSave = await data.save();
    
                    res.status(200).json(dataToSave);
                }
            }
        }
        catch (error) {
            console.log(error)
            res.status(400).json({message: error.message})
        }
    }
}