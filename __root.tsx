import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import './__root.css';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/"><h1>Holocron de Star Wars</h1></Link>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
