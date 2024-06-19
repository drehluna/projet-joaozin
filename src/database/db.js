import mongoose from 'mongoose'

async function connectDatabase() {
  await mongoose.connect(
    'mongodb+srv://luccaws:Lacucinadelre@cluster0.8or2mmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    
  )
}


export default connectDatabase