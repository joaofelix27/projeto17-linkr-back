import { Router } from 'express';
import { hello } from '../controllers/testctr.js'

const test = Router();

test.get('/',hello);

export default test;