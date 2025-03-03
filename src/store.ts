import {create} from "zustand"
import {devtools} from 'zustand/middleware'
import { CryptoCurrency, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = {
  cryptocurrencies: CryptoCurrency[]
  fetchCrypto: () => Promise<void>
  fetchData: (pair: Pair) => Promise<void>
}  

export const useCryptoStore = create<CryptoStore>()(devtools((set)=>({
  cryptocurrencies: [],
    fetchCrypto: async () => {
      const  cryptocurrencies = await getCryptos()
      set(()=>({
        cryptocurrencies
      }))

    },
    fetchData: async (pair) => {
      const result = await fetchCurrentCryptoPrice(pair)
      console.log(result)
      
    }
})))