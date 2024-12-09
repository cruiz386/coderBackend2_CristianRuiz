import { connect } from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGO_DB_LINK;

export const initMongoDB = async() => {
  try {
    await connect(connectionString);
  } catch (error) {
    throw new Error(error)
  }
}