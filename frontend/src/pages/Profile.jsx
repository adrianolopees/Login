import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const outLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 ">
      <h1 className="text-2xl font-bold mb-4 ">profile</h1>
      <button
        onClick={outLogin}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sair
      </button>
    </div>
  );
};

export default Profile;
