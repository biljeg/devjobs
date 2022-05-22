import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getFirestore, doc, getDoc } from "../../firebase"
import { Button2 } from "../utils/Utils.component"
import { ThemeContext } from "../../App"
import "./Details.scss"

const db = getFirestore()
const Details = () => {
	const [state, setState] = useState({ data: null, loading: true })
	const { id } = useParams()
	const docRef = doc(db, "jobs", id)
	const { isDarkMode } = useContext(ThemeContext)

	useEffect(() => {
		const fetch = async () => {
			try {
				const snapshot = await getDoc(docRef)
				const data = snapshot.data()
				setState({ data: data, loading: false })
			} catch (e) {
				console.error(e)
			}
		}
		fetch()
	}, [docRef])

	return (
		!state.loading && (
			<>
				<div>
					<div>
						<img src={state.data.logo.url} alt={state.data.logo.name} />
					</div>
					<h4>{state.data.company}</h4>
					<a>{state.data.website}</a>
					<span>{state.data.location}</span>
					<Button2 theme={isDarkMode ? "dark" : "light"}>Company Site</Button2>
				</div>
				<div>
					<div>
						<span>{state.data.postedAt}</span>
						<span>{state.data.contract}</span>
						<h2>{state.data.position}</h2>
						<span>{state.data.location}</span>
						<button>Apply Now</button>
					</div>
					<div>
						<p>{state.data.description}</p>
					</div>
					<div>
						<h3>Requirements</h3>
						<p>{state.data.requirements.content}</p>
						<ul>
							{state.data.requirements.items.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
					<div>
						<h3>What You Will Do</h3>
						<p>{state.data.role.content}</p>
						<ol>
							{state.data.role.items.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ol>
					</div>
				</div>
				<footer>
					<h2>{state.data.position}</h2>

					<a>{state.data.website}</a>
				</footer>
			</>
		)
	)
}
export default Details
