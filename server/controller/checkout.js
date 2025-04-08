import Order from "../models/checkout.js"

export const userOrder = async (req, res) => {
    console.log("went in");
    try{
        const{
            userID,
            option,
            address,
            contactNumber,
            type,
            items
        } = req.body
        console.log("got in");

        const newUserOrder = new Order({
            userID,
            option,
            address,
            contactNumber,
            type,
            items
        })
    console.log("again in");


        const savedUserOrder = await newUserOrder.save()
    console.log("save in " + savedUserOrder);

        res.status(201).json(savedUserOrder)

    } catch(err){
        res.status(500).json({error: err.message})
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userID: userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ })
    }
}

export const updateOrder = async (req, res) => {
    console.log("went")

    const orderId = req.params.id; // Extract order ID from request parameters
    const updatedOrderData = req.body; // Extract updated order data from request body
  
    try {
      // Find the order by ID and update it with the new data
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
      console.log("went")
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(updatedOrder); // Send the updated order as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        console.log("went in");
        const orders = await Order.find();
        console.log("testing: " + orders);
        res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}