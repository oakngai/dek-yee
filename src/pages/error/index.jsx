import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title = "Oops!";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message || "Page not found.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
