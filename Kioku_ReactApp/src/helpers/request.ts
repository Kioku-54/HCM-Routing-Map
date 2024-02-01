/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import axios from 'axios'

export const callPostApi = (key: string, api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(api, body, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPostApiAsync = (key: string, api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(api, body, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      .then((result) => {
        resolve(result.data.data)
      })
      .catch((error) => {
        reject(null)
      })
  })
}

export const callPostApiWithoutToken = (api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(api, body, {
        withCredentials: true
      })
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPatchApi = (key: string, api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(api, body, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPutApi = (key: string, api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(api, body, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPutApiWithoutToken = (api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(api, body, {
        withCredentials: true
      })
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callGetApi = (key: string, api: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callGetApiWithoutToken = (api: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(api, {
        withCredentials: false
      })
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callPatchApiWithoutToken = (api: string, body: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(api, body)
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callDeleteApi = (key: string, api: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(api, {
        headers: {
          Authorization: `Bearer ${key}`
        }
      })
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callDeleteApiWithoutToken = (api: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(api)
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}
