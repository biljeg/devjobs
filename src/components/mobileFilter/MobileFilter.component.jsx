import { createPortal } from "react-dom"
import { useContext, useState } from "react"
import { ThemeContext } from "../../App"
import { Button1 } from "../utils/Utils.component"
import locationIcon from "../../assets/desktop/icon-location.svg"
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

	const checkboxClick = e => {
		setIsChecked(e.target.checked)
	}
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
					<label
						className={`fulltime-desktop-label ${
							isDarkMode ? "fulltime-desktop-label-dark" : ""
						}`}
						htmlFor="fullTime-desktop"
					>
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
								{isChecked && (
									<svg
										width={15}
										height={12}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="m1 6.57 3.572 3.572L13.714 1"
											stroke="#FFF"
											strokeWidth={2}
											fill="none"
										/>
									</svg>
								)}
							</div>
							<input
								className="visually-hidden"
								type="checkbox"
								checked={isChecked}
								onClick={checkboxClick}
								id="fullTime-desktop"
								{...formRegister("fullTimeMobile")}
							/>
						</div>
						<span>
							Full Time <span className="full-time-only">Only</span>
						</span>
					</label>
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
