import express from 'express';
import {saveDraft, retrieveDraft} from "../controllers/index.js";

const routes = express.Router()

routes.post('/saveDraft', saveDraft)
routes.get('/retrieveDraft', retrieveDraft)

export {
  routes
}
