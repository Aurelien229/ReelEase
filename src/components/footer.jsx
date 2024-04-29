import facebookImg from '../assets/img/facebook.png';
import twitterImg from '../assets/img/twitter.png';
import linkedinImg from '../assets/img/linkedin.png';
import pinterestImg from '../assets/img/pinterest.png';
import youtubeImg from '../assets/img/youtube.png';
import instagramImg from '../assets/img/instagram.png';
import googleImg from '../assets/img/google.png';
import backgroundImage from '../assets/img/footer2.jpg';
import Home from '../assets/img/home.png';
const Footer = () => {
    return (
        <div className="bg-cover bg-center h-[350px] md:h-[250px]" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className=" container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-4 py-10 md:mb-0 flex flex-col items-center text-center">
                            <p className="text-4xl p-1 mb-5 font_1 font-bold">REELEASE</p>
                            <img className="mr-1" src={Home} alt="Home" />
                            <p className="flex flex-row font_2">The cupboard under the stairs,</p>
                            <p className="flex flex-row font_2">4 Privet drive</p>
                            <p className="flex flex-row font_2">Little Whinging. Surrey</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-4 md:mb-0 text-center">
                            <p className="text-lg font-bold  font_1 mb-5">Social Media</p>
                            <div className="flex gap-4">
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.facebook.com/" target="_blank"><img src={facebookImg} alt="Facebook" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.twitter.com/" target="_blank"><img src={twitterImg} alt="Twitter" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.linkedin.com/" target="_blank"><img src={linkedinImg} alt="Linkedin" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.youtube.com/" target="_blank"><img src={youtubeImg} alt="Youtube" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.instagram.com/" target="_blank"><img src={instagramImg} alt="Instagram" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.google.com/" target="_blank"><img src={googleImg} alt="Google+" className="h-6 w-6" /></a>
                                <a className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100" href="https://www.pinterest.com/" target="_blank"><img src={pinterestImg} alt="Pinterest" className="h-6 w-6" /></a>
                            </div>
                        </div>
                    </div>

                </div>
           
        </div>
    );
};

export default Footer;
