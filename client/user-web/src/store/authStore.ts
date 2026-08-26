import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthStoreState {
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    popAccessToken: () => void
}

const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
            popAccessToken: () => set({ accessToken: null })
        }),
        {
            name: 'auth-storage'
        }
    )
)

export default useAuthStore