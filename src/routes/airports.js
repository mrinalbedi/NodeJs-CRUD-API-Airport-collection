import express from 'express';

import AirportController, { AIRPORT_PREFIX } from "../controllers/Airport";

const router = express.Router();
const Airport_controller = new AirportController();

router
    .get('/', Airport_controller.getAll)
    .get('/forms', Airport_controller.getForms)
    .post('/create', Airport_controller.validate(), Airport_controller.create)
    .post('/update', Airport_controller.validate(), Airport_controller.update)
    .post('/delete', Airport_controller.delete);

export default router
export { AIRPORT_PREFIX }