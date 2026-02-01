import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Toaster, toast } from "sonner"
import "../styles/login.css"
import { useNavigate } from "react-router-dom"

const urlBase = import.meta.env.VITE_BACKEND_URL

export const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [searchParams, _] = useSearchParams()
    const navigate = useNavigate()


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (newPassword === "" || confirmPassword === "") {
            toast.error("Debes completar ambos campos de contraseña.")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("¡Las contraseñas no coinciden! Por favor, verifique.")
            return
        }
        try {
            const response = await fetch(`${urlBase}/update-password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${searchParams.get("token")}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ password: newPassword })
            })

            if (response.ok) {
                toast.success("¡Contraseña actualizada con éxito!")
                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            } else {
                toast.error("Hubo un problema. El enlace puede haber expirado o ser inválido.")
            }

        } catch (error) {
            toast.error("Error de conexión con el servidor. Intenta de nuevo más tarde.")
        }
    }


    return (
        <div className="container">
            <Toaster position="top-center" richColors />
            <div className="row d-flex justify-content-center my-5 ">
                <h1 className="text-center mb-5"> Actualizar contraseña</h1>
                <div className="col-12 col-md-6 border py-4 bg-verdes mb-5">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="inputNewPassword" className="mb-4">Nueva contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="*********************"
                                    id="inputNewPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={({ target }) => setNewPassword(target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye"></i>
                                    )}

                                </button>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="inputConfirmPassword" className="mb-4">Confirmar nueva contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="*********************"
                                    id="inputConfirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={({ target }) => setConfirmPassword(target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye"></i>
                                    )}
                                </button>
                            </div>
                            {newPassword && confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-danger mt-2">¡Las contraseñas no coinciden!</p>
                            )}
                        </div>
                        <button
                            className="btn btn-outline-primary w-100"
                            disabled={!newPassword || newPassword !== confirmPassword}
                        >Actualizar Contraseña</button>
                    </form>
                </div>
            </div >
        </div >
    )
}