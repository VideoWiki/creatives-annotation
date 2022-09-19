import { uploadData, downloadData } from "./swarm.service.js";

const persistInfoAndGetReference = async (info, encrypted) => {
  let uploadedReference = await uploadData(info, encrypted)
  if (encrypted) {
    return {
      reference: uploadedReference.reference.substring(0, 64),
      encryptionKey: uploadedReference.reference.substring(64,128)
    }
  } else {
    return {
      reference: uploadedReference.reference
    }
  }
}

const retrieveInfoFromReference = async (reference, encryptionKey) => {
  return await downloadData(reference, encryptionKey)
}

export {
  persistInfoAndGetReference,
  retrieveInfoFromReference
}
