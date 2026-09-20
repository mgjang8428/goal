import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface AuthStoreState {
	accessToken: string | null
	setAccessToken: (token: string | null) => void
	popAccessToken: () => void
}

const useAuthStore = create<AuthStoreState>()(
	devtools(
		persist(
			(set) => ({
				accessToken: null,
				setAccessToken: (token) => {
					set(
						{ accessToken: token },
						undefined,
						"authStore/setAccessToken"
					)
				},
				popAccessToken: () => {
					set(
						{ accessToken: null },
						undefined,
						"authStore/popAccessToken"
					)
				}
			}),
			{
				name: "auth-storage"
			}
		),
		{ name: "authStore" }
	)
)

export default useAuthStore
