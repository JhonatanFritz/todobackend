  // db.js
  import mongoose from 'mongoose';

  export default async function connectDB() {
    const { MONGODB_URI } = process.env;

    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('Conectado a la base de datos TaskApp');
    } catch (error) {
      console.error('Error de conexión a MongoDB:', error.message);
    }
  }
