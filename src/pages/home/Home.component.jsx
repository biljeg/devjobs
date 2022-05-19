import "./Home.scss"
import { Link } from "react-router-dom"

const Home = () => {
	return (
		<div>
			<h1>Devjobs</h1>
			<p>Find your perfect career in no time</p>
			<Link to="/jobs">
				<button>GET STARTED</button>
			</Link>
		</div>
	)
}

export default Home
