import "../styles/home.css";
import "../styles/signup.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

const initialUserState = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const urlBase = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [user, setUser] = useState(initialUserState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  // ✅ DEBUG HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const payload = {
      email: user.email.trim(),
      password: user.password,
      name: user.name?.trim(),
      username: user.username?.trim(),
    };

    console.log("VITE_BACKEND_URL =", urlBase);
    console.log("Signup payload =", payload);

    try {
      const response = await fetch(`${urlBase}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text(); // ✅ ver respuesta aunque no sea JSON
      console.log("Signup status =", response.status);
      console.log("Signup raw response =", text);

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        // si no es JSON, no pasa nada
      }

      if (!response.ok) {
        toast.error(data?.msg || data?.message || `Error ${response.status}: ${text}`);
        return;
      }

      toast.success("Registro exitoso. Ahora inicia sesión.");
      setUser(initialUserState);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo conectar con el backend.");
    }
  };

  return (
    <div className="container">
      <Toaster position="top-center" richColors />

      <div className="d-flex flex-column">
        <div className="row justify-content-center my-4">
          <div className="col-7 mb-4">
            <h1 className="text-center bg-warning-subtle mx-5 p-4">
              Regístrate en ActívaT
            </h1>
          </div>

          <div className="col-12 col-md-6">
            <form
              className="border border-secundary p-5 bg-azul"
              onSubmit={handleSubmit}
            >
              <div className="form-group mb-3">
                <label htmlFor="txtName" className="mb-2">
                  <b>Nombre completo:</b>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="form-control"
                  id="txtName"
                  name="name"
                  onChange={handleChange}
                  value={user.name}
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="txtEmail" className="mb-2">
                  <b>Correo:</b>
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@email.com"
                  className="form-control"
                  id="txtEmail"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                  required
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="txtUsername" className="mb-2">
                  <b>Nombre de usuario:</b>
                </label>
                <input
                  type="text"
                  placeholder="usuario"
                  className="form-control"
                  id="txtUsername"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                />
              </div>

              <div className="form-group my-4">
                <label htmlFor="btnPassword" className="mb-2">
                  <b>Contraseña:</b>
                </label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="******************"
                    className="form-control"
                    id="btnPassword"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
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

              <div className="form-group my-4">
                <label htmlFor="btnConfirmPassword" className="mb-2">
                  <b>Confirmar Contraseña:</b>
                </label>

                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="******************"
                    className="form-control"
                    id="btnConfirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={user.confirmPassword}
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

                {user.confirmPassword &&
                  user.password &&
                  user.password !== user.confirmPassword && (
                    <p className="text-danger mt-2">¡Las contraseñas no coinciden!</p>
                  )}
              </div>

              <button
                className="btn btn-outline-primary w-100 mt-4"
                disabled={
                  !user.email ||
                  !user.password ||
                  user.password !== user.confirmPassword
                }
              >
                Guardar
              </button>

              <div className="d-flex justify-content-between mt-3">
                <Link to="/login">Ya tengo cuenta</Link>
                <span />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
