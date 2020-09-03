import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/index';

dotenv.config();
if (!process.env.SERVER_PORT) {
  console.error('Environment variable SERVER_PORT is required');
  process.exit(1);
}

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string, 10);
const GRAPHQL_API_PATH: string = process.env.GRAPHQL_API_PATH as string;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('build'));

app.use('/api/hello', apiRouter);

// Handles any requests that don't match the routes above
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'build' });
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}

export default app;
