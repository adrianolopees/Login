import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Entrar no TrackMe</h1>

      <form className="w-full max-w-sm flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Email ou usuário"
          className="bg-gray-100 p-2 border-none rounded outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          className="bg-gray-100 p-2 border-none rounded outline-none"
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
