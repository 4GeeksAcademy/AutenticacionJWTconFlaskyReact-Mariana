import { useState } from "react"
import { toast, Toaster } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import "../styles/tasks.css"

const notify = () => toast('¡Debes ingresar una nueva tarea!');



export const Tasks = () => {
    const [datosIniciales, setDatosIniciales] = useState("")
    const [tarea, setTarea] = useState([])

    const handleChange = (event) => {
        setDatosIniciales({
            [event.target.name]: event.target.value,
            id: uuidv4()
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!datosIniciales.tarea) {
            notify();
            return
        }

        setTarea([
            ...tarea,
            datosIniciales
        ])

        setDatosIniciales({
            tarea: "",
        })
    }

    const deleteTarea = (id) => {
        const newList = tarea.filter((item) => item.id !== id)
        setTarea(newList)
    }

    return (
        <div className="container bg-light pb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-9 col-md-7">
                    <p className="text-center fs-1 my-3 text-danger">ActívaT</p>
                    <Toaster />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                className="form-control sombra fs-3 text-black-50 border border-secondary-subtle p-3 ps-5 m-0 rounded-0"
                                placeholder="Ingresar tarea nueva."
                                onChange={handleChange}
                                name="tarea"
                                value={datosIniciales.tarea}
                            />
                        </div>
                    </form>
                </div>

                <div className="col-9 col-md-7 m-0 ">
                    {
                        tarea.map((item) => (
                            <div key={item.id} className="tarea-completa sombra bg-body d-flex justify-content-between align-items-center border border-top-0 border-secondary-subtle p-2 ps-5 m-0">
                                <div>
                                    <p className="m-0 fs-3 text-secondary">{item.tarea}</p>
                                </div>
                                <div>
                                    <button
                                        className="ocultar btn text-danger fs-1 m-0 me-3 p-0"
                                        onClick={() => (deleteTarea(item.id))}
                                    >x</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-9 col-md-7 m-0">
                    <div className="bg-body border border-top-0 border-secondary-subtle p-2 ps-3 m-0 shadow">
                        <p className="m-0 fs-5 text-body-tertiary">{tarea.length} {tarea.length === 1 || tarea.length === 0 ? 'item restante' : 'items restantes'}</p>
                    </div>
                </div>
                <div className="col-9 col-md-7 m-0 px-3">
                    <div className="bg-body border border-top-0 border-secondary-subtle pt-1 m-0 shadow">
                    </div>
                </div>
                <div className="col-9 col-md-7 m-0 px-4">
                    <div className="bg-body border border-top-0 border-secondary-subtle pt-1 m-0 shadow mb-5">
                    </div>
                </div>
            </div >
        </div >
    )
}