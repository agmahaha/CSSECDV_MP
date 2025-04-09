import User from "../models/users.js"

export const getUser = async (req, res) => {
        console.log(req.params)
    try{
        
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)

    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const adminGetUser = async (req, res) => {
    console.log(req.params)
try{
    
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)

} catch(err){
    res.status(404).json({ message: err.message })
}
}

export const updateUser = async(req, res) =>{
    try{
        const{
            id, 
            phone_num,
        } = req.body

        const user = await User.updateOne({_id: id},
            {
                $set: {
                    phone_num: phone_num,
                }
            })
        res.status(200).json(user)

    } catch(err){
        res.status(404).json({ message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        console.log("went in");
        const orders = await User.find();
        console.log("testing: " + orders);
        res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}