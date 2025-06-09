import { Link, usePage } from '@inertiajs/react';
import { useEffect } from "react";

const NotFound = () => {
  const { url } = usePage().props as { url: string };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      url
    );
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
