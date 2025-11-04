import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import authRoutes from './src/routes/authRoute.js';
import servRoutes from './src/routes/servRoute.js';
import bannerRoutes from './src/routes/bannerRoute.js';
import balanceRoutes from './src/routes/balanceRoute.js';
import { errorHandler } from './src/utils/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api', servRoutes);
app.use('/api', bannerRoutes);
app.use('/api', balanceRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
})

export default app;
