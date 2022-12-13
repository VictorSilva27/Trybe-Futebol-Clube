import App from './app';
import 'dotenv/config';

const PORT = process.env.PGPORT || 3001;

new App().start(PORT);
