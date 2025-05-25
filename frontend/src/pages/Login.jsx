import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Import para feedback
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  // estado para armazenar os dados do form
  const [form, setForm] = useState({
    identifier: "", // no backend ele identifica se é email ou username
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // atualiza os estados conforme o tonto digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ao enviar essa merda
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("Login feito com sucesso!");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4">Entrar no TrackMe</h1>

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
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 flex items-center justify-center h-12 min-w-[120px]"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              <span>Entrando...</span>
            </>
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Ainda não tem conta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Cadastre-se
        </Link>
      </p>
      <ToastContainer />
    </motion.div>
  );
}

export default Login;
