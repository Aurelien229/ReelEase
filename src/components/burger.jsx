import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-8">
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-[#2092a4]"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-[#2092a4]"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-[#2092a4]"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] font_1 text-3xl">
              <li className="my-8 uppercase">
                <Link to="/movies">
                  <span className="text-[#2092a4] font_2 text-8xl font-bold">M</span>
                  <span>ovies</span>
                </Link>
              </li>
              <li className="my-8 uppercase">
                <Link to="/series">
                  <span className="text-[#2092a4] font_2 text-8xl font-bold">S</span>
                  <span>eries</span>
                </Link>
              </li>
              <li className="my-8 uppercase">
                <Link to="/about">
                  <span className="text-[#2092a4] font_2 text-8xl font-bold">A</span>
                  <span>bout</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden flex flex-row gap-8 lg:flex font_1 text-xl text-center">
          <li>
            <Link to="/movies">
              <span className="text-[#2092a4] font_2 text-5xl font-bold">M</span>
              <span>ovies</span>
            </Link>
          </li>
          <li>
            <Link to="/series">
              <span className="text-[#2092a4] font_2 text-5xl font-bold">S</span>
              <span>eries</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span className="text-[#2092a4] font_2 text-5xl font-bold">A</span>
              <span>bout</span>
            </Link>
          </li>
        </ul>
      </nav>
      <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: black;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
