import { RouterLocaleSet } from "@/config/route/router";
import useSigninViewModel from "@/viewmodel/auth/useSigninViewModel";
import { NavLink } from "react-router";

export default function SigninPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    signinHandler
  } = useSigninViewModel()
  return (
    <>
      <h1>SignIn Page</h1>
      <NavLink to={RouterLocaleSet.MAIN_PAGE} end>
        <p>Go Main</p>
      </NavLink>
      <form onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => { signinHandler(event) }}>
        <label>ID</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <label>PW</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button type="submit">SignIn</button>
      </form>
    </>
  )
}
