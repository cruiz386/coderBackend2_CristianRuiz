import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateToken = (user) => {

    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20m' });

}