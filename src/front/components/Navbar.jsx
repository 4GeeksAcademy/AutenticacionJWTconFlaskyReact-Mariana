import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css"
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	const logout = () => {
		dispatch({ type: "SET_TOKEN", payload: null })
		dispatch({ type: "SET_USER", payload: null })
		localStorage.removeItem("token")
		localStorage.removeItem("user")
	}

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">ActívaT</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto navbar-ul">
						<li className="nav-item mx-2">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive ? "bordered" : ""}`}
								to={"/"}
							>Inicio</NavLink>
						</li>
						<li className="nav-item mx-3" >
							<NavLink
								className={({ isActive }) => `nav-link ${isActive ? "bordered" : ""}`}
								to={"/todos"}
							>Lista</NavLink>
						</li>
					</ul>
					{
						store.token ? (
							<div>
								<button
									className="btn btn-outline-danger ms-3"
									onClick={() => logout()}
								>Cerrar sesión</button>
							</div>
						) : (
							<div>
								<NavLink
									to={"/login"}
									className={"btn btn-outline-warning"}>
									Iniciar Sesión
								</NavLink>
							</div>
						)
					}
				</div>
			</div>
		</nav>
	);
};