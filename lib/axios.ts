import { Personal, User } from "@prisma/client"
import axios from "axios"


export const getUser = (email: string) => (url: string) => axios.get<User & { personal: Personal }>(url, {
  params: {
    email
  }
}).then(res => res.data)
