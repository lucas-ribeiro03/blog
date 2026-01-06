"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {isLogin ? "Entrar na conta" : "Criar conta"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {isLogin
                  ? "Digite suas credenciais para acessar"
                  : "Preencha os dados para se registrar"}
              </p>
            </div>

            {isLogin ? <LoginForm /> : <RegisterForm />}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                {isLogin
                  ? "Não tem uma conta? Registre-se"
                  : "Já tem uma conta? Faça login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

