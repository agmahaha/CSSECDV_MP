import mongoose from "mongoose"

const itemSchema = new mongoose.Schema(
    {
        itemName: { 
            type: String,
            required: true
        },
        type: { // is it vandal, phantom, knife, sheriff
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }
);

const OrderSchema = new mongoose.Schema(
    {
        userID:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users',
            required: true,
        },
        contactNumber:{
            type: Number
        },
        status:{
            type: String, 
            enum: ['pending', 'IP', 'FD', 'delivered', 'completed'], // IP = in-progress, FD = for-delivery
            default: 'pending',
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        orderDate:{
            type: Date, 
            default: Date.now,
            required: true
        },
        type:{ // bundle or single item
            type: String,
            required: true,
        },  
        items: [itemSchema],
        total: {
            type: Number,
            default: 0 // Default total to 0
        },
        paymentInstructions: {
            type: String,
            default: "Please pay through Gcash: 09*********"
        }
    }, {timestamps: true}
);

OrderSchema.pre('save', function(next) {
    const items = this.items;
    let total = 0;

    for (const item of items) {
        total += item.price * item.numberOfItems;
    }
    this.total = total;
    next();
});

const Checkout = mongoose.model("Checkout", OrderSchema)
export default Checkout