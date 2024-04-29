import Cinema from '../assets/img/cinema.jpg';

const Navbar = () => {
    return (
      <nav className="navbar bg-[#01030d] text-white p-4  flex justify-between items-center px-10 py-10 gap-2">
        <div className=" justify-start">
          <a className="navbar-item" href="/">
          <img src={Cinema} alt="Reelease" className="w-32 h-32 rounded-full" />
          </a>
        </div>
        <h1 className="navbar-title justify-center text-3xl font_1-black">Reelease</h1>
        <div className="navbar-menu font_2">
          <div className=" justify-end">
            <a className="navbar-item" href="/about">
              About
            </a><br/>
            <a className="navbar-item" href="/contact">
              Contact
            </a><br/>
            <a className="navbar-item" href="/contact">
              Read me
            </a>
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar;