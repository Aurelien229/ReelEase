import Cinema from '../assets/img/cinema.jpg';
import Header from './burger.jsx';

const Navbar = () => {
    return (
        <nav className="navbar bg-[#01030d] text-white p-4  flex justify-between items-center px-10 py-10 gap-2">
            <div className=" justify-start">
                <a className="navbar-item" href="/">
                    <img src={Cinema} alt="Reelease" className="w-32 h-32 rounded-full" />
                </a>
            </div>
            <h1 className="navbar-title justify-center text-4xl font_1">
                <span className="text-white">Reel</span>
                <span className="text-[#2092a4]">ease</span>
            </h1>
            <Header/>
        </nav>
    );
};

export default Navbar;
