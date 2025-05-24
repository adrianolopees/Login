import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // estado para armazenar os dados do form
  const [form, setForm] = useState({
    identifier: "", // no backend ele identifica se é email ou username
    password: "",
  });

  const [error, setError] = useState("");

  // atualiza os estados conforme o tonto digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ao enviar essa merda
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Entrar no TrackMe</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form
        className="w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="identifier"
          placeholder="Email ou usuário"
          value={form.identifier}
          onChange={handleChange}
          className="bg-gray-100 p-2 border-none rounded outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-100 p-2 border-none rounded outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>

      <p className="mt-4 text-sm">
        Ainda não tem conta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}

export default Login;
