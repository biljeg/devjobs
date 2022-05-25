import { Link, useLocation } from "react-router-dom"
import moon from "../../assets/desktop/icon-moon.svg"
import sun from "../../assets/desktop/icon-sun.svg"
import devjobsLogo from "../../assets/desktop/logo.svg"
import "./Header.scss"

const Header = ({ handleSwitch, darkMode }) => {
	const location = useLocation()
	return (
		<header
			className={`${
				location.pathname.split("/")[1] === "jobs" &&
				location.pathname.split("/")[2] !== ""
					? "header-jobs-page"
					: ""
			} ${location.pathname === "/jobs" ? "header-jobs-page" : ""}`}
		>
			<nav>
				<Link to="/">
					<img src={devjobsLogo} />
				</Link>
				<div className="theme-switch">
					<div className="theme-icon">
						<img src={sun} alt="" />
					</div>
					<div className="switch-container">
						<label className="switch-label">
							<input
								onChange={handleSwitch}
								type="checkbox"
								className="switch-input"
								checked={darkMode ? "checked" : ""}
							/>
							<span className="switch-design"></span>
						</label>
					</div>
					<div className="theme-icon">
						<img src={moon} className="icon-moon" alt="" />
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
