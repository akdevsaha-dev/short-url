import { create } from "zustand"
import type { User } from "./authStore"
import axios from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

type Url = {
    id: string
    originalUrl: string
    shortUrl: string
    createdAt: string
    clicks?: number
    userId?: string
    createdBy?: User
}

type urlStore = {
    url: Url | null
    urls: Url[] | null
    isCreatingLink: boolean
    isGettingUrls: boolean
    getUrls: () => Promise<Url[] | false>
    createLink: (url: string) => Promise<Url | false>
}

export const useUrlStore = create<urlStore>((set) => ({
    url: null,
    urls: null,
    isCreatingLink: false,
    isGettingUrls: false,
    createLink: async (url: string) => {
        try {
            set({ isCreatingLink: true });
            const res = await axiosInstance.post("/url/createShortUrl", { url })
            set({ url: res.data.url })
            return res.data
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "Something went wrong";
                toast.error(message);
                return false;
            }
            return false;

        } finally {
            set({ isCreatingLink: false });
        }
    },
    getUrls: async () => {
        try {
            set({ isGettingUrls: true })
            const res = await axiosInstance.get("/url/getUrls")
            set({ urls: res.data.url })
            return res.data.url
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.error || "something went wrong"
                toast.error(message)
                return false
            }
            return false;
        } finally {
            set({ isGettingUrls: false })
        }
    }
}))