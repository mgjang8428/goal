import { RouterLocaleSet } from "@/config/route/router"
import useAuthStore from "@/store/authStore"
import { Navigate } from "react-router"

export default function MainPage() {
    const accessToken = useAuthStore((state) => (state.accessToken))
    if (accessToken == null) {
        return (
            <>
                <h1>MainPage</h1>
                <p>Goal Project user-web client MainPage</p>
            </>
        )
    } else {
        return <Navigate to={RouterLocaleSet.DASHBOARD_PAGE} />
    }

}
