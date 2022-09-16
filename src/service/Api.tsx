import { api } from "./http";

export const getFakeApi = async() => {
    const {data} = await api.get('/simulacoes')

    return data
}