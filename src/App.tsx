import { ErrorBoundary } from "react-error-boundary";
import { Link, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import Menu from "./Menu";
import ErrorFallback from "./shared/ErrorFallback";
import Heading from "./shared/Heading";

export default function App() {
  return (
    <main>
      <Heading level={1}>React Restaurant</Heading>
      <nav className="bg-indigo-100 p-2">
        <ul className="flex">
          <li className="mr-2">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Menu />
            </ErrorBoundary>
          }
        />

        <Route
          path="/admin"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Admin />
            </ErrorBoundary>
          }
        />
      </Routes>
    </main>
  );
}
