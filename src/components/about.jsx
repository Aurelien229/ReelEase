import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import MeImg from '../assets/img/me.jpg';

const About = () => {
    const name = 'Aurélien Blampain ';

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-5 my-5 font_1 text-center md:mx-auto lg:my-20">
                <div className="flex flex-col md:flex-row md:justify-center md:mb-4 md:space-x-4">
                    <div className="md:w-1/3 md:pr-4 md:mb-4">
                        <h1 className="text-2xl text-[#2092a4] font-bold mb-4 md:text-4xl">{name}</h1>
                        <img src={MeImg} alt={name} className="mb-4 mx-auto" />
                    </div>
                    <div className="md:w-2/3 md:mb-4 md:flex md:flex-col md:justify-between">
                        <div className="md:text-center">
                            <div className="mb-4">
                                <p className="mb-2">Date de naissance: 1982-11-30</p>
                                <p className="mb-4">Lieu de naissance: Charleroi, Belgique, Europe</p>
                                <p className="text-xl text-[#2092a4] font-bold mb-4 md:text-3xl">A propos de moi</p>
                                <p>
                                    Hello, moi c'est Aurélien, un suis un passionné de technologie, de nature et de Cinéma.<br />
                                    Ma carrière, initialement orientée dans l’HORECA, a récemment pris un tournant significatif vers le monde de la programmation et du développement.<br />

                                    Ayant choisi de suivre ma passion pour l'informatique, j'ai entrepris une reconversion professionnelle afin de me spécialiser en développement web.<br />
                                    Mon engagement envers cette transition est actuellement illustré par ma participation active au programme de formation rigoureux de BeCode Charleroi, où j'acquiers des compétences pratiques et une expertise technique dans divers langages de programmation, frameworks et technologies de pointe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
