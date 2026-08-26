import { RouterLocaleSet } from '@/config/route/router'
import useSignupViewModel from '@/viewmodel/auth/useSignupViewModel'
import type React from 'react'
import { NavLink } from 'react-router'

export default function SignupPage() {
    const {
        username,
        password,
        name,
        email,
        setUsername,
        setPassword,
        setName,
        setEmail,
        signupHandler
    } = useSignupViewModel()

    return (
        <>
            <h1>SignupPage</h1>
            <NavLink to={RouterLocaleSet.MAIN_PAGE} end>
                <p>Go Main</p>
            </NavLink>
            <form onSubmit={(event: React.SubmitEvent<HTMLFormElement>) => { signupHandler(event) }}>
                <label>ID</label>
                <input
                    id='username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>PW</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>이름</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>E-mail</label>
                <input
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'>가입</button>
            </form>
        </>
    )
}
