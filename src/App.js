import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home.component"
import Jobs from "./pages/jobs/Jobs.component"
import Header from "./components/header/Header.component"
import NotFound from "./components/notfound/NotFound.component"
import Details from "./components/details/Details.component"
import "./App.scss"

//THEME
// colors: {
// 	primary: {
// 		violet: "#9e7f66",
// 		lightViolet: "#939BF4",
// 		veryDarkBlue: "#19202D",
// 		midnight: "#121721",
// 	},
// 	neutral: {
// 		white: "#FFFFFF",
// 		lightGrey: "#F4F6F8",
// 		grey: "#9DAEC2",
// 		darkGrey: "#6E8098",
// 	},
// 	rgba: {},
// },
// breakpoints: {
// 	mobile: "...",
// 	tablet: "?",
// 	desktop: "...",
// },

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/jobs" element={<Jobs />} />
				<Route path="/jobs/:id" element={<Details />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
