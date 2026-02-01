import { useState } from "react"
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom"
import "../styles/signup.css"

const urlBase = import.meta.env.VITE_BACKEND_URL

export const ResetPass = () => {
    const [email, setEmail] = useState({
        email: ""
    })

    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail({ email: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (email.email.trim() === "") {
            toast.error("Debe colocar un correo válido");
            return;
        }
        try {
            const response = await fetch(`${urlBase}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            })

            if (response.ok || response.status === 404) {
                toast.success("Si la dirección existe, recibirás un correo para restablecer la contraseña.");
                setTimeout(() => {
                    navigate("/login")
                }, 3000);

                setEmail({ email: "" })
            } else {
                toast.error("Ocurrió un error inesperado al procesar tu solicitud.");
            }
        } catch (error) {
            toast.error("Error de conexión con el servidor. Intenta de nuevo más tarde.")
        }
    }


    return (
        <div className="container mb-5 pb-5">
            <Toaster position="top-center" richColors />
            <div className="row d-flex justify-content-center my-5">
                <h1 className="text-center pb-5">Recuperación de contraseña</h1>
                <div className="col-12 col-md-6 border py-4 bg-azul">
                    <form
                        onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="btnRecoveryPassword" className="mb-3">Correo electrónico</label>
                            <input type="email"
                                className="form-control mb-4"
                                placeholder="ejemplo@gmail.com"
                                id="btnRecoveryPassword"
                                name="email"
                                value={email.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <button
                            className="btn btn-outline-success w-100"
                            disabled={email.email.trim() === ""}>
                            Recuperar contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}