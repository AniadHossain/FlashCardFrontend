import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
      <div className="min-h-full flex flex-col justify-center py-15 bg-gray-900">
        <div className="sm: max-auto sm:w-full sm:max-w-mid">
            <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-slate-200">
                Sign in to your account
            </h2>
            <AuthForm />
        </div>
      </div>
    )
  }