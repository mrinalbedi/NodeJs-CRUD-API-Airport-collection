import checkAPIs from 'express-validator';
const { validationResult } = checkAPIs;

class BaseController {
    get_page_path;
    page_title;

    constructor(model, get_page_path) {
        this._model = model;
        this.get_page_path = get_page_path;

        this.page_title = model.name;

        this.sendError = this.sendError.bind(this);
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    sendError(res, e) {
        return res.status(400).json({ error: e.message });
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            return res.json(await this._model.create(req.body));
        } catch (e) {
            return await this.sendError(res, e);
        }
    }

    async getAll(req, res) {
        throw new Error('This method is not implemented');
    }

    async delete(req, res) {
        try {
            await this._model.findByIdAndDelete(req.body.id);

            return res.json('success');
        } catch (e) {
            return await this.sendError(res, e);
        }
    }

    async update(req, res) {
        throw new Error('This method is not implemented');
    }
}

export default BaseController