import "./Job.scss"
import { getAuth, onAuthStateChanged } from "../../firebase"
import { useNavigate } from "react-router-dom"
import Login from "../login/Login.component"
import { useEffect, useState } from "react"
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
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => setUserObj(user))
		return unsubscribe
	}, [])

	return (
		<>
			<Login isOpened={loginOpened} onClose={closeLogin} />
			<div className="job-wrapper">
				<div className="job-logo" style={bg}>
					<img src={`${logo.url}`} alt={`${company} logo`} />
				</div>
				<span>{postedAt}</span>
				<span>{contract}</span>

				{userObj ? (
					<h3 onClick={() => redirectToDetails(id)}>{position}</h3>
				) : (
					<h3 onClick={redirectToSignIn}>{position}</h3>
				)}
				<span>{company}</span>
				<span>{location}</span>
			</div>
		</>
	)
}
export default Job
