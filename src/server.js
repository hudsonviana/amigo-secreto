import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import siteRoutes from './routes/site.js';
import adminRoutes from './routes/admin.js';
import { requestInterceptor } from './utils/requestInterceptor.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestInterceptor);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port, server) => {
  server.listen(port, () => console.log(`Server running at port: ${port}`));
};

const regularServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
  //
} else {
  const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9000;
  runServer(serverPort, regularServer);
}
