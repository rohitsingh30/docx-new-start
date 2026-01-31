import mongoose from 'mongoose';

export const connectMongo = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  await mongoose.connect(mongoUri);
};

export const disconnectMongo = async (): Promise<void> => {
  await mongoose.disconnect();
};
