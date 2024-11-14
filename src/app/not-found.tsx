import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <span className="text-6xl mb-4 animate-pulse">😢</span>
      <p className="text-lg mb-6">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
