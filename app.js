import express from 'express';
import authRoutes from './src/routes/authRoute.js';
import { errorHandler } from './src/utils/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
})

export default app;
