import mongoose from 'mongoose';

/**
 * 0 = desconectado
 * 1 = conectado
 * 2 = conectando
 * 3 = desconectando
 */
const mongoConection = {
    isConected:0
}

export const connect = async () =>{
    if(mongoConection.isConected){
        console.log('Ya estábamos conectados');
        return;
    }
    if(mongoose.connections.length>0){
        mongoConection.isConected= mongoose.connections[0].readyState;
        if(mongoConection.isConected ===1){
            console.log('usando conexión anterior');
            return;
        }
        await mongoose.disconnect();
    }
    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConection.isConected=1;
    console.log('conectado a MongoDB: ', process.env.MONGO_URL)
}
export const disconnect = async()=>{
    if(process.env.NODE_ENV ==='development') return;
    if(mongoConection.isConected ===0) return;
    await mongoose.disconnect();
    console.log('Desconectado a MongoDb')
}