import { useState, useEffect, useContext } from "react"
import { ThemeContext } from "../../App"
import { useForm } from "react-hook-form"
import MobileFilter from "../mobileFilter/MobileFilter.component"
import locationIcon from "../../assets/desktop/icon-location.svg"
import searchIcon from "../../assets/desktop/icon-search.svg"
import filterIcon from "../../assets/mobile/icon-filter.svg"
import checkIcon from "../../assets/desktop/icon-check.svg"
import "./Filter.scss"

const Filter = ({ resetForm, onSubmit }) => {
	const { register, handleSubmit, resetField } = useForm({
		defaultValues: {
			search: "",
			locationDesktop: "",
			fullTimeDesktop: false,
			locationMobile: "",
			fullTimeMobile: "",
		},
	})
	const { isDarkMode } = useContext(ThemeContext)
	const [filterOpened, setFilterOpened] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [desktopFilter, setDesktopFilter] = useState(
		window.matchMedia("(min-width: 600px)").matches
	)
	const checkboxClick = e => {
		setIsChecked(e.target.checked)
	}
	const closeFilter = () => {
		setFilterOpened(false)
	}
	useEffect(() => {
		window
			.matchMedia("(min-width: 600px)")
			.addEventListener("change", e => setDesktopFilter(e.matches))
	}, [])

	return (
		<div
			className={`jobs-filter-wrapper ${
				isDarkMode ? "jobs-filter-wrapper-dark" : ""
			}`}
		>
			<form className="form-container" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					{desktopFilter && <img src={searchIcon} />}
					<label className="visually-hidden" htmlFor="search">
						Search by job title
					</label>
					<input
						id="search"
						type="text"
						placeholder="Filter by title…"
						{...register("search")}
					/>
				</div>
				{desktopFilter && (
					<div className="form-group">
						<img src={locationIcon} />
						<label className="visually-hidden" htmlFor="location-desktop">
							Search by location
						</label>
						<input
							id="location-desktop"
							type="text"
							placeholder="Filter by location…"
							{...register("locationDesktop")}
						/>
					</div>
				)}
				{desktopFilter && (
					<div className="form-group">
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
									{...register("fullTimeDesktop")}
								/>
							</div>
							<span>
								Full Time <span className="full-time-only">Only</span>
							</span>
						</label>
					</div>
				)}
				<MobileFilter
					isOpened={filterOpened}
					onClose={closeFilter}
					formRegister={register}
					formHandleSubmit={handleSubmit}
					formOnSubmit={onSubmit}
				/>

				<div className="form-buttons">
					{!desktopFilter && (
						<button
							type="button"
							className={`filter-icon ${isDarkMode ? "filter-icon-dark" : ""}`}
							onClick={() => setFilterOpened(true)}
						>
							<img src={filterIcon} />
						</button>
					)}
					<button className="form-btn" type="submit">
						Search
					</button>
					<button
						className="form-btn"
						type="button"
						onClick={() => resetForm(resetField)}
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	)
}
export default Filter
