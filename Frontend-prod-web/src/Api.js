import axios from 'axios'

const API_BASE = 'http://localhost:7182/api' 

export async function fetchProducts(q){
  const params = {}
  if(q) params.q = q
  const resp = await axios.get(`${API_BASE}/produtos`, { params })
  return resp.data
}

export async function createProduct(payload){
  const resp = await axios.post(`${API_BASE}/produtos`, payload)
  return resp.data
}
