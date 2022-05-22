import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createContext, useState, useEffect } from "react"
import Home from "./pages/home/Home.component"
import Jobs from "./pages/jobs/Jobs.component"
import Header from "./components/header/Header.component"
import NotFound from "./components/notfound/NotFound.component"
import Details from "./components/details/Details.component"
import "./App.scss"
//make the default value according to prefers-dark-mode ?

export const ThemeContext = createContext({
	isDarkMode: false,
	themeSwitch: () => {},
})

const App = () => {
	const [darkMode, setDarkMode] = useState(false)
	const themeSwitch = () => {
		setDarkMode(!darkMode)
	}
	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme:dark").matches)
			setDarkMode(true)
	}, [])
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("body-dark")
		} else {
			document.body.classList.remove("body-dark")
		}
	}, [darkMode])

	return (
		<Router>
			<ThemeContext.Provider
				value={{
					isDarkMode: darkMode,
					themeSwitch: () => {},
				}}
			>
				<Header darkMode={darkMode} handleSwitch={themeSwitch} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/jobs" element={<Jobs />} />
					<Route path="/jobs/:id" element={<Details />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ThemeContext.Provider>
		</Router>
	)
}

export default App
