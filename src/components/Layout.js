const Layout = ({ children }) => {
    return (
      <div className="container mx-auto max-w-[1200px]">
        <header className="py-4 bg-gray-800 text-white text-center">
          <h1>Kitap Uygulaması</h1>
        </header>
        <main className="py-8">{children}</main>
        <footer className="py-4 bg-gray-800 text-white text-center">
          <p>Telif Hakkı © 2024</p>
        </footer>
      </div>
    );
  };
  
  export default Layout;
  