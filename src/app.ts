import express from 'express';
import dotenv from 'dotenv'
import chatRoute from './routes/chat'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/chat', chatRoute);

app.listen(port, () => {
    console.log("Server is running in at port ${port}")
})