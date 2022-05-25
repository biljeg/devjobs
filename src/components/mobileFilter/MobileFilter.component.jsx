import { createPortal } from "react-dom"
import { useContext, useState } from "react"
import { ThemeContext } from "../../App"
import { Button1 } from "../utils/Utils.component"
import locationIcon from "../../assets/desktop/icon-location.svg"
import checkIcon from "../../assets/desktop/icon-check.svg"
import "./MobileFilter.scss"

const MobileFilter = ({
	isOpened,
	onClose,
	formRegister,
	formHandleSubmit,
	formOnSubmit,
}) => {
	const { isDarkMode } = useContext(ThemeContext)
	const [isChecked, setIsChecked] = useState(false)
	if (!isOpened) return null

	return createPortal(
		<>
			<div className="overlay" onClick={onClose}></div>
			<div className={`filter-card ${isDarkMode ? "filter-card-dark" : ""}`}>
				<div
					className={`form-group-mobile ${
						isDarkMode ? "form-group-mobile-dark" : ""
					}`}
				>
					<img src={locationIcon} />
					<label className="visually-hidden" htmlFor="location-mobile">
						Search by location
					</label>
					<input
						id="location-mobile"
						type="text"
						placeholder="Filter by location…"
						{...formRegister("locationMobile")}
					/>
				</div>
				<div>
					<div
						className={`custom-checkbox-container ${
							isDarkMode ? "custom-checkbox-container-dark" : ""
						}`}
					>
						<div
							className={`custom-checkbox ${
								isChecked ? "custom-checkbox-checked" : ""
							}`}
						>
							{isChecked && <img src={checkIcon} />}
						</div>
						<input
							className="visually-hidden"
							type="checkbox"
							id="fullTime-mobile"
							{...formRegister("fullTimeMobile")}
						/>
						<label htmlFor="fullTime-mobile">Full Time Only</label>
					</div>
				</div>
				<Button1 type="submit" onClick={formHandleSubmit(formOnSubmit)}>
					Search
				</Button1>
			</div>
		</>,
		document.getElementById("filter")
	)
}

export default MobileFilter
