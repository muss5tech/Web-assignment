import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Background gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-secondary/15 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-accent-primary/10 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
