import RestorePassword from "../../components/Forms/Login/RestorePasswordForm";
export default function LoginPage() {

  return (
    <div className="w-[35%] mx-auto mt-[5rem] bg-gray-900 p-[2rem] h-[80%] rounded-2xl flex flex-col items-center">
      <h1 className="text-4xl font-medium text-center mb-[2rem]">Enter email to restore password</h1>
      <RestorePassword />
    </div>
  );
}
