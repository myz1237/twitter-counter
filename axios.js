import { Axios } from "axios";
import { config } from 'dotenv';
config();

export const myAxios = new Axios({
    headers: {
        "Authorization": `Bearer ${process.env.TOKEN}`
    }
})