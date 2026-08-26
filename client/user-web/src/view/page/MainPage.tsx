import { NavLink } from "react-router"

function MainPage() {
    return (
        <>
            <h1>MainPage</h1>
            <p>Goal Project user-web client MainPage</p>
            <NavLink to="/signup" end>
                <p>signup</p>
            </NavLink>
            <NavLink to="/signin" end>
                <p>signin</p>
            </NavLink>
        </>
    )
}

export default MainPage
