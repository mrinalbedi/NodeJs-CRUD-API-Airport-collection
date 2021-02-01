import checkAPIs from 'express-validator';
const { check } = checkAPIs;
import BaseController from "./base";
import Airport from '../models/airport';

const AIRPORT_PREFIX = '/airports';

// Create a class named "CategoryController" which will inherit the methods from the "BaseController" class,
// by using the extends keyword.
// By calling the super() method in the constructor method, we call the parent's constructor method and
// get access to the parent's properties and methods:

class AirportController extends BaseController {
    constructor() {
        super(Airport, AIRPORT_PREFIX);

        this.getForms = this.getForms.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate() {
        return [
            check('Airport_Code')
                .exists().withMessage('Field Airport_Code must exist')
                .isString().withMessage('Airport Code must be of the string type')
                .trim().isLength({ min: 3}).withMessage('Airport Code must  be at least 3 characters long')
                .trim().isLength({ max: 3}).withMessage('Airport Code must  be at least 3 characters long'),
            check('Phone_Number')
                .exists().withMessage('Field Phone_Number must exist')
                .isNumeric().withMessage('Phone Number must be of the numeric type')
                .isLength({ min: 10}).withMessage('Phone number must be exactly 10 characters long')
                .isLength({ max: 10}).withMessage('Phone number must be exactly 10 characters long')
                ]
    }

    async getForms(req, res) {
        res.render('pages/airports', { airports: await this._model.find().lean() });
    }

    //lean() makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs),
    // not Mongoose documents.

    // By default, Mongoose queries return an instance of the Mongoose Document class.
    // Documents are much heavier than vanilla JavaScript objects, because they have a lot
    // of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a
    // full Mongoose document and just give you the POJO.

    async getAll(req, res) {
        try {
            let airports = await this._model.find().lean();

            return res.json(airports);
        } catch (e) {
            this.sendError(res, e);
        }
    }

    async update(req, res) {
        try {
            let data = {
                Airport_Code: req.body.Airport_Code,
                Phone_Number: req.body.Phone_Number
            };
            let obj = await this._model.findByIdAndUpdate(req.body.id, data, {new: true});
            if (obj === null) throw new ReferenceError("Object with this id does not exist");

            return res.json(obj);
        } catch (e) {
            this.sendError(res, e);
        }
    }
}

export default AirportController
export { AIRPORT_PREFIX }