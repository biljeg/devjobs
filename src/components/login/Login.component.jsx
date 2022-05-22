import { createPortal } from "react-dom"
import { useContext, useState } from "react"
import "./Login.scss"
import { useForm } from "react-hook-form"
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "../../firebase"
import closeIconLight from "../../assets/login/icon-close-light.svg"
import closeIconDark from "../../assets/login/icon-close-dark.svg"
import googleIcon from "../../assets/login/icon-google.svg"
import emailIcon from "../../assets/login/icon-email.svg"
import lockIcon from "../../assets/login/icon-lock.svg"
import loginLogo from "../../assets/login/login-logo.svg"
import { ButtonLogin } from "../utils/Utils.component"
import { ThemeContext } from "../../App"

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

const Login = ({ isOpened, onClose }) => {
	const [isSignUp, setIsSignUp] = useState(false)
	const { isDarkMode } = useContext(ThemeContext)
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
			<div
				className={`login-container ${
					isDarkMode ? "login-container-dark" : ""
				}`}
			>
				<div
					className={`close-btn ${isDarkMode ? "close-btn-dark" : ""}`}
					onClick={onClose}
				>
					{isDarkMode ? (
						<img alt="close button" src={closeIconDark} />
					) : (
						<img alt="close button" src={closeIconLight} />
					)}
				</div>
				<div className="logo-container">
					<img src={loginLogo} alt="devjobs logo" />
				</div>
				<h3
					className={`login-heading ${isDarkMode ? "login-heading-dark" : ""}`}
				>
					{isSignUp ? "Sign up" : "Login"}
				</h3>
				{isSignUp ? (
					<form
						onSubmit={handleSignUp(signUp)}
						className="login-sign-up-form"
						id="sign-up-form"
					>
						<div className="login-wrapper">
							<label className="login-label" htmlFor="email-sign-up">
								Email
							</label>
							<div className="login-input-container">
								<img alt="" aria-hidden="true" src={emailIcon} />
								<input
									className="login-input"
									id="email-sign-up"
									{...signUpRegister("emailSignUp")}
								/>
							</div>
						</div>
						<div className="login-wrapper">
							<label className="login-label" htmlFor="password-sign-up">
								Password
							</label>
							<div className="login-input-container">
								<img alt="" aria-hidden="true" src={lockIcon} />
								<input
									className="login-input"
									id="password-sign-up"
									{...signUpRegister("passwordSignUp")}
								/>
							</div>
						</div>
						<ButtonLogin type="submit">Sign Up</ButtonLogin>
					</form>
				) : (
					<form
						onSubmit={handleLogin(login)}
						className="login-sign-up-form"
						id="login-form"
					>
						<div className="login-wrapper">
							<label className="login-label" htmlFor="email-login">
								Email
							</label>
							<div className="login-input-container">
								<img alt="" aria-hidden="true" src={emailIcon} />
								<input
									className="login-input"
									id="email-login"
									{...loginRegister("emailLogin")}
								/>
							</div>
						</div>
						<div className="login-wrapper">
							<label className="login-label" htmlFor="password-login">
								Password
							</label>
							<div className="login-input-container">
								<img alt="" aria-hidden="true" src={lockIcon} />
								<input
									className="login-input"
									id="password-login"
									{...loginRegister("passwordLogin")}
								/>
							</div>
						</div>
						<ButtonLogin type="submit">Login</ButtonLogin>
					</form>
				)}
				<div className="google-login" onClick={googleLogin}>
					<div>
						<img alt="" src={googleIcon} />
						<span>Sign up with google</span>
					</div>
				</div>
				{isSignUp ? (
					<div className="login-signup-switch">
						<p>
							Already have an account?
							<span onClick={() => setIsSignUp(false)}>Login instead</span>
						</p>
					</div>
				) : (
					<div className="login-signup-switch">
						<p>
							Don't have an account?
							<span onClick={() => setIsSignUp(true)}>Sign up instead</span>
						</p>
					</div>
				)}
			</div>
		</>,
		document.getElementById("portal")
	)
}
// if sign in successful, close the form
export default Login
