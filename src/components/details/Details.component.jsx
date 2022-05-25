import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getFirestore, doc, getDoc } from "../../firebase"
import { Button1, Button2 } from "../utils/Utils.component"
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
	}, [])

	return (
		!state.loading && (
			<section className="details-container">
				<div
					className={`company-card ${isDarkMode ? "company-card-dark" : ""}`}
				>
					<div
						className="company-card-logo"
						style={{ backgroundColor: state.data.logoBackground }}
					>
						<img src={state.data.logo.url} alt={state.data.logo.name} />
					</div>
					<div className="company-card-info">
						<h3 className={isDarkMode ? "heading-text-dark" : "heading-text"}>
							{state.data.company}
						</h3>
						<a className="dark-gray-text">{`${
							state.data.website.split("/")[3]
						}.com`}</a>
					</div>
					<Button2 theme={isDarkMode ? "dark" : "light"}>Company Site</Button2>
				</div>
				<div
					className={`details-card ${isDarkMode ? "details-card-dark" : ""}`}
				>
					<div className="details-card-header-wrapper">
						<div className="details-card-header">
							<div>
								<span className="dark-gray-text">{state.data.postedAt} </span>
								<span className="decoration-dot">•</span>
								<span className="dark-gray-text"> {state.data.contract}</span>
							</div>
							<h2 className={isDarkMode ? "heading-text-dark" : "heading-text"}>
								{state.data.position}
							</h2>
							<span className="violet-text details-location">
								{state.data.location}
							</span>
						</div>
						<Button1>Apply Now</Button1>
					</div>
					<div className="details-card-description">
						<p className={isDarkMode ? "gray-text" : "dark-gray-text"}>
							{state.data.description}
						</p>
					</div>
					<div className="details-card-requirements">
						<h3 className={isDarkMode ? "heading-text-dark" : "heading-text"}>
							Requirements
						</h3>
						<p className={isDarkMode ? "gray-text" : "dark-gray-text"}>
							{state.data.requirements.content}
						</p>
						<ul>
							{state.data.requirements.items.map((item, idx) => (
								<li
									className={isDarkMode ? "gray-text" : "dark-gray-text"}
									key={idx}
								>
									<div className="violet-text">•</div>
									<div>{item}</div>
								</li>
							))}
						</ul>
					</div>
					<div className="details-card-roles">
						<h3 className={isDarkMode ? "heading-text-dark" : "heading-text"}>
							What You Will Do
						</h3>
						<p className={isDarkMode ? "gray-text" : "dark-gray-text"}>
							{state.data.role.content}
						</p>
						<ol>
							{state.data.role.items.map((item, idx) => (
								<li
									className={isDarkMode ? "gray-text" : "dark-gray-text"}
									key={idx}
								>
									<div className="violet-text">{idx + 1}</div>
									<div>{item}</div>
								</li>
							))}
						</ol>
					</div>
				</div>
				<footer
					className={`footer-container ${
						isDarkMode ? "footer-container-dark" : ""
					}`}
				>
					<div className="details-footer">
						<div>
							<h2
								className={`details-footer-item ${
									isDarkMode ? "heading-text-dark" : "heading-text"
								}`}
							>
								{state.data.position}
							</h2>
							<a className="details-footer-item dark-gray-text">
								{state.data.company}
							</a>
						</div>
						<Button1>Apply Now</Button1>
					</div>
				</footer>
			</section>
		)
	)
}
export default Details
