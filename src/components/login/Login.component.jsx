import { createPortal } from "react-dom"
import { useState } from "react"
import "./Login.scss"
import { useForm } from "react-hook-form"
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "../../firebase"

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

const Login = ({ isOpened, onClose }) => {
	const [isSignUp, setIsSignUp] = useState(false)
	const {
		register: loginRegister,
		handleSubmit: handleLogin,
		formState: { errors: loginErrors },
	} = useForm()
	const {
		register: signUpRegister,
		handleSubmit: handleSignUp,
		formState: { errors: signUpErrors },
	} = useForm()
	if (!isOpened) return null

	const login = async ({ emailLogin, passwordLogin }) => {
		try {
			await signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
			onClose()
		} catch (err) {
			console.error(err)
		}
	}
	const signUp = async ({ emailSignUp, passwordSignUp }) => {
		try {
			await createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
			onClose()
		} catch (err) {
			console.error(err)
		}
	}
	const googleLogin = async () => {
		try {
			await signInWithPopup(auth, googleProvider)
			onClose()
		} catch (err) {
			console.error(err)
		}
	}

	return createPortal(
		<>
			<div className="overlay"></div>
			<div className="login-container">
				<span className="close-btn" onClick={onClose}>
					x
				</span>
				<h3>{isSignUp ? "Sign up" : "Log in"} with email and password</h3>
				{isSignUp ? (
					<form onSubmit={handleSignUp(signUp)} className="sign-up">
						<label htmlFor="email-sign-up">Email</label>
						<input id="email-sign-up" {...signUpRegister("emailSignUp")} />
						<label htmlFor="password-sign-up">Password</label>
						<input
							id="password-sign-up"
							{...signUpRegister("passwordSignUp")}
						/>
						<button type="submit">Sign up</button>
					</form>
				) : (
					<form onSubmit={handleLogin(login)} className="login">
						<label htmlFor="email-login">Email</label>
						<input id="email-login" {...loginRegister("emailLogin")} />
						<label htmlFor="password-login">Password</label>
						<input id="password-login" {...loginRegister("passwordLogin")} />
						<button type="submit">Log in</button>
					</form>
				)}
				<h3>Or proceed with google instead</h3>
				<div className="google-login" onClick={googleLogin}>
					Google
				</div>
				<hr />
				{isSignUp ? (
					<p>
						Already have an account?
						<span onClick={() => setIsSignUp(false)}>Log in instead</span>
					</p>
				) : (
					<p>
						Don't have an account?
						<span onClick={() => setIsSignUp(true)}>Sign up instead</span>
					</p>
				)}
			</div>
		</>,
		document.getElementById("portal")
	)
}
// if sign in successful, close the form
export default Login
