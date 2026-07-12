import { request } from "./client"
import type { ContactPayload } from "./types"
export const sendContact = (payload: ContactPayload) => request("/contact", { method: "POST", body: JSON.stringify(payload) })
