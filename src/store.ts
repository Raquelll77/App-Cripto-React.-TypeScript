import {create} from "zustand"
import {devtools} from 'zustand/middleware'
import { CryptoCurrency, CryptoPrice, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = {
  cryptocurrencies: CryptoCurrency[]
  result: CryptoPrice
  loading: boolean
  fetchCrypto: () => Promise<void>
  fetchData: (pair: Pair) => Promise<void>
}  

export const useCryptoStore = create<CryptoStore>()(devtools((set)=>({
  cryptocurrencies: [],
  result:{} as CryptoPrice,
    fetchCrypto: async () => {
      const  cryptocurrencies = await getCryptos()
      set(()=>({
        cryptocurrencies
      }))

    },
    loading: false
    ,
    fetchData: async (pair) => {
      
      set(()=>({
        loading: true
        
      }))
      
      const result = await fetchCurrentCryptoPrice(pair)
      set(()=>({
        result,
        loading:false
      }))
      
    }
})))