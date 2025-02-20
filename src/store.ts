import {create} from "zustand"
import axios from "axios"
import { CryptoCurrencyResponseSchema } from "./schema/cripto-schema"

async function getCryptos(){
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`

    const {data: {Data}} = await axios(url)
    const result = CryptoCurrencyResponseSchema.safeParse(Data)
    console.log(result)
}

export const useCryptoStore = create(()=>({
    fetchCrypto: () => {
        getCryptos()

    }
}))