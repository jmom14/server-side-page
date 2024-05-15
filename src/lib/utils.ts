const { default: mongoose } = require("mongoose")

type Connection = {
  isConnected: boolean,
}

const connection: Connection = {
  isConnected: false,
};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db_url = process.env.MONGO;
    const db = await mongoose.connect(db_url)
    connection.isConnected = db.connections[0].readyState;

  } catch (error: any) {
    console.log('connecting db error: ', error);
    throw new Error(error);
  }
}