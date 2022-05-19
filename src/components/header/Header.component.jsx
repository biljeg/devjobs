import "./Header.scss"
import { Link, NavLink } from "react-router-dom"
import devjobsLogo from "../../assets/desktop/logo.svg"
import { getAuth, signOut, onAuthStateChanged } from "../../firebase"
import { useState, useEffect } from "react"
import Login from "../login/Login.component"
const auth = getAuth()

const Header = () => {
	const [userObj, setUserObj] = useState(null)
	const [loginOpened, setLoginOpened] = useState(false)

	const logOut = () => {
		signOut(auth)
	}
	const login = () => {
		setLoginOpened(true)
	}
	const closeLogin = () => {
		setLoginOpened(false)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => setUserObj(user))
		return unsubscribe
	}, [])

	return (
		<div>
			<nav>
				<Login onClose={closeLogin} isOpened={loginOpened} />
				<Link to="/">
					<img src={devjobsLogo} />
				</Link>
				<NavLink to="/jobs">Jobs</NavLink>
				{userObj ? (
					<button onClick={logOut}>Log out</button>
				) : (
					<button onClick={login}>Log in</button>
				)}
				{/* signOut(auth); */}
				{/* {if(user !== null)<button onClick={signOut}></button> */}
				{/* <ThemeSwitch>
					<Icon />
					<Switch type="switch" />
					<Icon />
				</ThemeSwitch> */}
			</nav>
		</div>
	)
}

export default Header
