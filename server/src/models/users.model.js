import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
