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
            address,
            phone_num,
            name
        } = req.body

        const user = await User.updateOne({_id: id},
            {
                $set: {
                    address: address,
                    phone_num: phone_num,
                    name: name
                }
            })
        res.status(200).json(user)

    } catch(err){
        res.status(404).json({ message: err.message })
    }
}