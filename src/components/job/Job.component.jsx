import "./Job.scss"
import { getAuth, onAuthStateChanged, signOut } from "../../firebase"
import { useNavigate } from "react-router-dom"
import Login from "../login/Login.component"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../App"
const auth = getAuth()

const Job = ({
	postedAt,
	contract,
	position,
	company,
	location,
	logo,
	logoBackground,
	id,
}) => {
	const [loginOpened, setLoginOpened] = useState(false)
	const [userObj, setUserObj] = useState(null)
	const navigate = useNavigate()
	const redirectToSignIn = () => {
		setLoginOpened(true)
	}
	const redirectToDetails = id => {
		navigate(`/jobs/${id}`)
	}
	const bg = {
		backgroundColor: logoBackground,
	}
	const closeLogin = () => {
		setLoginOpened(false)
	}
	const { isDarkMode } = useContext(ThemeContext)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => setUserObj(user))
		return unsubscribe
	}, [])

	return (
		<>
			<Login isOpened={loginOpened} onClose={closeLogin} />
			<div className={`job-wrapper ${isDarkMode ? "job-wrapper-dark" : ""}`}>
				<div className="job-logo" style={bg}>
					<img src={`${logo.url}`} alt={`${company} logo`} />
				</div>
				<div className="job-info-wrapper">
					<div>
						<span className="dark-gray-text">{postedAt}</span>
						<span className="decoration-dot ">•</span>
						<span className="dark-gray-text">{contract}</span>
					</div>

					{userObj ? (
						<h3
							onClick={() => redirectToDetails(id)}
							className={`job-header ${
								isDarkMode ? "heading-text-dark" : "heading-text"
							}`}
						>
							{position}
						</h3>
					) : (
						<h3
							onClick={redirectToSignIn}
							className={`job-header ${
								isDarkMode ? "heading-text-dark" : "heading-text"
							}`}
						>
							{position}
						</h3>
					)}
					<span className="dark-gray-text">{company}</span>
				</div>
				<span className="violet-text-jobs">{location}</span>
			</div>
		</>
	)
}
export default Job
