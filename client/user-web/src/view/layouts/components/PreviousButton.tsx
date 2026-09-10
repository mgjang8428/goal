import { RouterLocaleSet } from "@/config/route/router";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function PreviousButton() {

    const navigate = useNavigate()
    const location = useLocation()

    const hidePreviousButtonPath: string[] = [
        RouterLocaleSet.MAIN_PAGE,
        RouterLocaleSet.DASHBOARD_PAGE
    ]

    function previousButtonHandler() {
        navigate(-1)
    }

    return (
        hidePreviousButtonPath.includes(location.pathname) ? (<></>) : (
            <>
                <button
                    onClick={previousButtonHandler}
                    children="<-"
                />
            </>
        )
    )
}
