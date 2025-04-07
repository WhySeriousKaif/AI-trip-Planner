import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500">Oops!</h1>
      <p className="text-gray-600 mt-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 mt-1">
        <i>{error.statusText || error.message}</i>
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorBoundary;
