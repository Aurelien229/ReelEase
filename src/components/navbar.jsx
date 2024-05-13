import { NavLink } from 'react-router-dom';
import Cinema from '../assets/img/cinema.jpg';
import Header from './burger.jsx';

const Navbar = () => {
    return (
        <nav className="navbar bg-[#01030d] text-white p-4  flex justify-between items-center px-10 py-10 gap-2 relative">
            <div className=" justify-start">
                <a className="navbar-item" href="/">
                    <div className="rounded-full overflow-hidden w-32 h-32">
                        <img src={Cinema} alt="Reelease" className="w-full h-full object-cover" />
                    </div>
                </a>
            </div>
            <h1 className="navbar-title justify-center text-4xl font_1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <NavLink to="/">
                <span className="text-white text-8xl font_2">R</span>
                <span className="text-white">eel</span>
                <span className="text-[#2092a4]">ease</span>
                </NavLink>
            </h1>
            <Header/>
        </nav>
    );
};

export default Navbar;


