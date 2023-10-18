import LoginForm from "../../components/Forms/Login/LoginForm";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="w-[35%] mx-auto mt-[5rem] bg-gray-900 p-[2rem] h-[80%] rounded-2xl flex flex-col items-center">
      <h1 className="text-4xl font-medium text-center mb-[1rem]">Login</h1>
      <LoginForm />
      <p
        className="mt-[2rem] text-xl text-violet-400 cursor-pointer"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't have an account? Create a new one
      </p>
    </div>
  );
}
