import axios from 'axios'

export const GDApi= axios.create({
    baseURL:'http://localhost:3000/'
})