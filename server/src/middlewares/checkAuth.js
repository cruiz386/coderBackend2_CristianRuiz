import  jwt  from 'jsonwebtoken';
import 'dotenv/config';

export const checkAuth = (req, res, next) => {

    try {
        const token = req.get('Authorization')
        if (!token) return res.status(401).json({ msg: 'Unaurhorized' })
        const tokenClean = token.split(' ')[1]
        const payloadDecode = jwt.verify(tokenClean, process.env.JWT_SECRET)
        req.user = payloadDecode
 
    } catch (error) {
        throw new Error(error)

    }
}