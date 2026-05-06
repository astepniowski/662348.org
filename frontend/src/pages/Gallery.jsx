import GalleryImage from "../components/Gallery/GalleryImage";
import "../styles/Gallery.css";
import { Link } from "react-router-dom";
import AudioPlayer from "../components/Gallery/AudioPlayer";

//row 1
import one from "../assets/images/1.jpg";
import two from "../assets/images/2.png";
import three from "../assets/images/3.jpg"
import four from "../assets/images/4.jpg"
import five from "../assets/images/5.jpg"
import six from "../assets/images/6.jpg"
import seven from "../assets/images/7.jpg"
import eight from "../assets/images/8.jpg"

//row 2
import nine from "../assets/images/9.jpg"
import ten from "../assets/images/10.jpg"
import eleven from "../assets/images/11.jpg"
import twelve from "../assets/images/12.jpg"
import thirteen from "../assets/images/13.jpg"
import fourteen from "../assets/images/14.jpg"
import fifteen from "../assets/images/15.jpg"
import sixteen from "../assets/images/16.jpg"

//row 3
import seventeen from "../assets/images/17.jpg"
import eighteen from "../assets/images/18.jpg"
import nineteen from "../assets/images/19.jpg"
import twenty from "../assets/images/20.jpg"
import twentyone from "../assets/images/21.jpg"
import twentytwo from "../assets/images/22.jpg"
import twentythree from "../assets/images/23.jpg"
import twentyfour from "../assets/images/24.jpg"
import twentyfive from "../assets/images/25.jpg"
import twentysix from "../assets/images/26.jpg"
import twentyseven from "../assets/images/27.jpg"
import twentyeight from "../assets/images/28.jpg"
import twentynine from "../assets/images/29.jpg"
import thirty from "../assets/images/30.jpg"
import thirtyone from "../assets/images/31.jpg"
import thirtytwo from "../assets/images/32.jpg"

const images = [
    {
        src: one,
        focusText: "yin & yang"
    },
    {
        src: two,
        focusText: "TUX #LARP"
    },
    {
        src: three,
        focusText: "2019",
        attachAudioPlayer: true,
        playlistIndex: 0
    },
    {
        src: four,
        focusText: "whip"
    },
    {
        src: five,
        focusText: "knight in shining armour"
    },
    {
        src: six,
        focusText: "custom made :D"
    },
    {
        src: seven,
        focusText: "scum",
        attachAudioPlayer: true,
        playlistIndex: 1
    },
    {
        src: eight,
        focusText: "firepower"
    },
    {
        src: nine,
        focusText: "prada specs",
        attachAudioPlayer: true,
        playlistIndex: 2
    },
    {
        src: ten,
        focusText: "footsies"
    },
    {
        src: eleven,
        focusText: "idle hands"
    },
    {
        src: twelve,
        focusText: "outback"
    },
    {
        src: thirteen,
        focusText: "helm"
    },
    {
        src: fourteen,
        focusText: "feel333",
        attachAudioPlayer: true,
        playlistIndex: 3
    },
    {
        src: fifteen,
        focusText: "goodnight",
        attachAudioPlayer: true,
        playlistIndex: 4
    },
    {
        src: sixteen,
        focusText: ""
    },
    {
        src: seventeen,
        focusText: "vile mf",
        attachAudioPlayer: true,
        playlistIndex: 5
    },
    {
        src: eighteen,
        focusText: "x",
    },
    {
        src: nineteen,
        focusText: "always & forever <3"
    },
    {
        src: twenty,
        focusText: "enemy turf",
        attachAudioPlayer: true,
        playlistIndex: 6
    },
    {
        src: twentyone,
        focusText: "better in the dark",
        attachAudioPlayer: true,
        playlistIndex: 7
    },
    {
        src: twentytwo,
        focusText: "y",
    },
    {
        src: twentythree,
        focusText: "night stallion"
    },
    {
        src: twentyfour,
        focusText: "(:"
    },
    {
        src: twentyfive,
        focusText: "kick",
        attachAudioPlayer: true,
        playlistIndex: 8
    },
    {
        src: twentysix,
        focusText: "<serenity>"
    },
    {
        src: twentyseven,
        focusText: "playtime"
    },
    {
        src: twentyeight,
        focusText: ":D"
    },
    {
        src: twentynine,
        focusText: "duwap",
        attachAudioPlayer: true,
        playlistIndex: 9
    },
    {
        src: thirty,
        focusText: "sadBob"
    },
    {
        src: thirtyone,
        focusText: "swag"
    },
    {
        src: thirtytwo,
        focusText: "9teen",
        attachAudioPlayer: true,
        playlistIndex: 10
    }
]

function Gallery() {
  return (
    <div>
        <div className="gallery-wrapper">
            {images.map((img, index) => 
                <GalleryImage
                    key={index}
                    src={img.src}
                    focusText={img.focusText}
                    className="gallery-image"
                    attachAudioPlayer={img.attachAudioPlayer
                    }
                    playlistIndex={img.playlistIndex}
                />
            )}
        </div>
        
        <Link to="/" className="redirect-home">home</Link>

        <p className = "footer">- you are a fleeting glimpse into my heart, and also a sorrowful figure etched into my brow</p>
    </div>
  );
}

export default Gallery;