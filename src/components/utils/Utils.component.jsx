import "./Utils.scss"

export const Button1 = props => {
	return (
		<button className="btn btn-1" style={props.style} onClick={props.onClick}>
			{props.children}
		</button>
	)
}
export const ButtonLogin = props => {
	return (
		<button className="btn btn-login" onClick={props.onClick}>
			{props.children}
		</button>
	)
}

export const Button2 = props => {
	return (
		<button
			className={`btn ${props.theme === "dark" ? "btn-2-dark" : "btn-2-light"}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}
