import axios from "axios";

const axiosService = axios.create({
    baseURL:'https://api.chucknorris.io/jokes/random'
});

export const apiMessage = {
    getMessage: () => axiosService.get().then(value => value.data)
}
