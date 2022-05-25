import "./Home.scss"
import { Link } from "react-router-dom"
import { Button1, Button2 } from "../../components/utils/Utils.component"
import { ThemeContext } from "../../App"
import { useContext } from "react"

const Home = () => {
	const { isDarkMode } = useContext(ThemeContext)
	return (
		<main className="home">
			<h1 className={isDarkMode ? "text-dark" : "text"}>Devjobs</h1>
			<p className={isDarkMode ? "text-dark" : "text"}>
				Find your perfect career in no time
			</p>
			<Link to="/jobs">
				<Button1>GET STARTED</Button1>
			</Link>
		</main>
	)
}

export default Home
