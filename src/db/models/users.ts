import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(v: any) {
                return /^\d{10}$/.test(v);
            },
            message: (props:any) => `${props.value} is not a valid phone number!`
        }
    },
    shippingAddress: {
        street: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        zip: {
            type: Number,
            default: 0
        },
        country: {
            type: String,
            default: ""
        }
    },
    paymentInfo :{
        cardNumber: {
            type: String,
            unique: true,
            validate: {
                validator: function(v: any) {
                    return /^\d{16}$/.test(v);
                },
                message: (props:any) => `${props.value} is not a valid card number!`
            },
            default: ""
        },
        cardHolder: {
            type: String,
            default: ""
        },
        expirationDate: {
            type: String,
            default: ""
        },
        cvv: {
            type: String,
            default: ""
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    }
});

export const UserModel = mongoose.model("users", UserSchema);