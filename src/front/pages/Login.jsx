import "../styles/home.css";
import "../styles/login.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Toaster, toast } from "sonner";

const initialUserState = {
  email: "",
  password: "",
};

const urlBase = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [user, setUser] = useState(initialUserState);
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // ✅ 1) Pide token al backend (JWT)
      const response = await fetch(`${urlBase}/api/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email.trim(),
          password: user.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(data?.msg || "Credenciales incorrectas. Intenta de nuevo.");
        return;
      }

      // ⚠️ Ajusta esto si tu backend devuelve "token" en vez de "access_token"
      const token = data.access_token ?? data.token;

      if (!token) {
        toast.error("El backend no devolvió un token. Revisa /api/token.");
        return;
      }

      // ✅ 2) Guarda token en sessionStorage + store
      sessionStorage.setItem("token", token);
      dispatch({ type: "SET_TOKEN", payload: token });

      // ✅ 3) (Opcional) Trae info del usuario autenticado
      // Si tu backend tiene /api/me úsalo. Si no, omite este bloque.
      let userPayload = null;
      try {
        const responseUser = await fetch(`${urlBase}/api/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseUser.ok) {
          const dataUser = await responseUser.json().catch(() => ({}));
          userPayload = dataUser.user ?? dataUser;
          sessionStorage.setItem("user", JSON.stringify(userPayload));
          dispatch({ type: "SET_USER", payload: userPayload });
        }
      } catch {
        // Si falla /api/me, no mates el login
      }

      toast.success("¡Sesión iniciada!");
      navigate("/private"); // ✅ ruta privada según consigna
    } catch (error) {
      console.log(error);
      toast.error("Error de conexión. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center sin-scroll">
      <Toaster position="top-center" richColors />
      <div className="row justify-content-center">
        <div className="col-7">
          <h1 className="text-center bg-warning-subtle mx-5 p-4">
            Ingresa ActívaT
          </h1>
        </div>

        <div className="col-12 col-md-6 py-4">
          <form onSubmit={handleSubmit} className="border border-secundary p-5 bg-verdes">
            <div className="form-group mb-3">
              <label htmlFor="btnEmail" className="mb-2">
                <b>Email:</b>
              </label>
              <input
                type="email"
                placeholder="tuemail@correo.com"
                className="form-control"
                id="btnEmail"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
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
                  value={user.password}
                  onChange={handleChange}
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

            <button className="btn btn-outline-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="w-100"></div>

        <div className="col-12 col-md-6 d-flex justify-content-between my-1">
          <Link to="/signup">Registrarme</Link>
          <Link to="/recovery-password">Olvidó contraseña</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
