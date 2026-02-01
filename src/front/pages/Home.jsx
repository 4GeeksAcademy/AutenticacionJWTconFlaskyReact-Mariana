import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/home.css"


export const Home = () => {
	return (
		<div className="container">
			<div className="row mb-5">
				<div className="col-7 bg-warning-subtle p-5 rounded mb-5">
					<h1 className="text-center mb-3">ActívaT</h1>
					<p className="fs-4">Es una lista de tareas que sirve para organizar tus actividades,
						ya sean personales o de trabajo, ayudando a priorizar, planificar y no olvidar nada.
						Permiten tener claridad mental, reducir la procrastinación al hacer las tareas más manejables
						y dar una sensación de logro al marcar lo completado.
					</p>

				</div>
				<div className="col-4 text-center">
					<img className="image"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaCgmMp-tvP-vI5n-QC9nUYDyE13RGknrWow&s" alt="Lista de tareas" />
				</div>
				<div className="col-5 text-center my-5 d-flex align-items-center">
					<img className="image"
						src="https://pasatuexam.mx/wp-content/uploads/2024/02/image-23.jpg" alt="Enfoque y organización" />
				</div>
				<div className="col-6 m-5">
					<h2 className="bg-warning-subtle p-3 rounded text-center">Beneficios claves de usar ActívaT</h2>
					<p className="bg-primary-subtle  p-4 me-5"><b>Mejora el enfoque y la organización: </b>
						Ayudan a estructurar tus pensamientos, identificar prioridades y concentrarte en lo que es importante.
					</p>
					<p className="bg-amarillo p-4 ms-5"><b>Evita olvidar tareas: </b>
						Sirven como un recordatorio para que no se te pase nada, desde actividades diarias hasta tareas importantes de un proyecto.
					</p>
					<p className="bg-verde p-4 me-5"><b>Reduce la procrastinación:</b> Al tener tareas claras y manejables,
						es más fácil comenzar y evitar la tendencia a posponerlas.
					</p>
					<p className="bg-danger-subtle p-4 ms-5"><b>Facilita la planificación: </b> Permiten asignar plazos,
						programar tareas y visualizar el trabajo futuro para gestionar el tiempo de manera más efectiva.
					</p>
					<p className="bg-success-subtle p-4 me-5"><b>Permite hacer seguimiento del progreso: </b> Marcar las tareas completadas
						te da una sensación de logro y motivación.
					</p>
					<p className="bg-morado p-4 ms-5"><b>Apoya la colaboración en equipo:</b> En un entorno profesional, las listas de tareas
						ayudan a los equipos a gestionar proyectos, delegar responsabilidades y mantenerse informados.
					</p>
				</div>
			</div>
		</div>
	);
}; 