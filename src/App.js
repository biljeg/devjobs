import GlobalStyles from "./components/styled/GlobalStyles"
import { ThemeProvider } from "styled-components"
import theme from "./components/styled/Theme"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home.component"
import { getFirestore, collection, getDocs, doc } from "./firebase"

const db = getFirestore()

function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</ThemeProvider>
		</Router>
	)
}

export default App

// git remote add origin https://github.com/biljeg/devjobs.git
// git branch -M main
// git push -u origin main
