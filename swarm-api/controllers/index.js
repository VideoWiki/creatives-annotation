import {persistInfoAndGetReference, retrieveInfoFromReference} from "../services/index.js";

const saveDraft = async (req, res, next) => {
  try {
    let info = req.body.data
    let encrypted = req.body.encrypted
    res.send(await persistInfoAndGetReference(info, encrypted))
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const retrieveDraft = async (req, res, next) => {
  try {
    let reference = req.body.reference
    let encryptionKey = req.body.encryptionKey
    res.send(await retrieveInfoFromReference(reference, encryptionKey))
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

export {
  saveDraft,
  retrieveDraft
}
