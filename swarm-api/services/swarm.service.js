import {Bee, BeeDebug} from "@ethersphere/bee-js"
import 'dotenv/config'

const beeDebug = new BeeDebug(process.env.BEE_DEBUG_ADDRESS)
const bee = new Bee(process.env.BEE_ADDRESS)
const postageStampsMinTTLYears = process.env.POSTAGE_STAMPS_MIN_TTL_YEARS
const postageStampsAmount = process.env.POSTAGE_STAMPS_AMOUNT
const postageStampsDepth = Number(process.env.POSTAGE_STAMPS_DEPTH)

const uploadData = async(info, encrypted = false) => {
  let batch = await getBatch()

  return bee.uploadData(batch.batchID, JSON.stringify(info), {encrypt : encrypted})
}

const downloadData = async(reference, encryptionKey) => {
  let decrypted = await bee.downloadData(reference + encryptionKey)
  // TODO if it is possible, download from gateway

  return JSON.parse(decrypted.text())
}

const getBatch = async() => {
  let batches = await beeDebug.getAllPostageBatch()
  let usableBatch = '';
  if (batches.length === 0) {
    usableBatch = await buyBatch()
  } else {
    for (const batch of batches.filter(batch => batch.label === 'batch1')) {
      if (batch.batchTTL >= postageStampsMinTTLYears*365*24*60*60 && batch.usable === true) {
        usableBatch = batch
      } else {
        usableBatch = await topUpBatch(batch)
      }
    }
    if (usableBatch === '') {
      usableBatch = await buyBatch()
    }
  }

  return usableBatch
}

const buyBatch = async() => {
  await beeDebug.createPostageBatch(postageStampsAmount , postageStampsDepth, {'label': 'batch1'})
  let batches = await beeDebug.getAllPostageBatch()

  return batches.pop()
}

const topUpBatch = async(batch) => {
  await beeDebug.topUpBatch(batch.batchID, postageStampsAmount)
  let batches = await beeDebug.getAllPostageBatch()

  return batches.pop()
}

export { uploadData, getBatch, buyBatch, topUpBatch, downloadData }
