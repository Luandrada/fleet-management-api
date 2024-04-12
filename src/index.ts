import {express} from 'express';
import taxisRoutes from "./routes/taxis.routes";

const PORT = 3000;
const app = express ();

app.use(express.json());

app.use('/api', taxisRoutes);

app.listen(PORT);

console.log('Escuchando en ', PORT)