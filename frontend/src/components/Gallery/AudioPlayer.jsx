import { useState, useRef, useEffect } from "react";

import vomit from "../../assets/audio/spree_hard/vomit.mp3"
import spit from "../../assets/audio/spree_hard/spit.mp3";
import org from "../../assets/audio/spree_hard/org.mp3";
import stab from "../../assets/audio/spree_hard/stab.mp3";
import tank from "../../assets/audio/spree_hard/tank.mp3";
import horse from "../../assets/audio/spree_hard/horse.mp3";
import scum from "../../assets/audio/scum.mp3";
import che_pouch from "../../assets/audio/che_pouch.mp3"
import feel from "../../assets/audio/feel.mp3"
import goodnight from "../../assets/audio/goodnight.mp3"
import vileradio_vol1 from "../../assets/audio/vileradio.mp3"
import enemyturf from "../../assets/audio/enemyturf.mp3"
import maybejustlookaround from "../../assets/audio/maybejustlookaround.mp3"
import kick from "../../assets/audio/kick.mp3"
import movie from "../../assets/audio/movie.mp3"
import nineteen from "../../assets/audio/nineteen.mp3"
import by_the_sea from "../../assets/audio/by_the_sea.mp3"
import surgeon_final from "../../assets/audio/final_surgeon.mp3"

const playlists = [
  [
    //playlistIndex[0] spree - hard
    { src: vomit , title: "spree - vomit" },
    { src: spit, title: "spree - spit" },
    { src: org, title: "spree - org" },
    { src: stab, title: "spree - stab" },
    { src: tank, title: "spree - tank" },
    { src: horse, title: "spree - horse" }
  ],
  [
    //playlistIndex[1] tekea - scum
    { src: scum, title: "tekea - scum"}
  ],
  [
    //playlistIndex[2] fult - che pouch
    { src: che_pouch, title: "fult - che pouch"}
  ],
  [
    //playlistIndex[3] yume - feel
    { src: feel, title: "yume - feel"}
  ],
  [
    //playlistIndex[4] chained2 - goodnight
    { src: goodnight, title: "chained2 - goodnight"}
  ],
  [
    //playlistIndex[5] vile radio - vol 1
    { src: vileradio_vol1, title: "vile radio vol. 1 - \"TURN UP THE MUSIC\" Spring 2025"}
  ],
  [
    //playlistIndex[6] elle mills - enemy turf
    { src: enemyturf, title: "elle mills - enemy turf"}
  ],
  [
    //playlistIndex[7] elle mills - maybe just look around
    { src: maybejustlookaround, title: "elle mills - maybe just look around"}
  ],
  [
    //playlistIndex[8] yume - kick
    { src: kick, title: "yume - kick"}
  ],
  [
    //playlistIndex[9] eastonrager - movie
    { src: movie, title: "eastonrager - movie"}
  ],
  [
    //playlistIndex[10] 3castles - 9teen
    { src: nineteen, title: "3castles - 9teen"}
  ],
  [
    //playlistIndex[11] roseara - by the sea
    { src: by_the_sea, title: "roseara - by the sea"}
  ],
  [
    //playlistIndex[12] surgeon - final
    { src: surgeon_final, title: "prodsurgeon - untitled"}
  ]
];

function AudioPlayer({ playlistIndex}) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playlist = playlists[playlistIndex] || [];
  const hasMultipleSongs = playlist.length > 1;

  function nextSong() {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }

  function prevSong() {
    setCurrentIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, [currentIndex]);

  return (
    <div className="audioplayer-wrapper">
      <audio
        key={currentIndex}
        ref={audioRef}
        src={playlist[currentIndex].src}
        controls
        onEnded={nextSong}
        autoPlay
        volume="0.05"
      />

      <div className="song-title">{playlist[currentIndex].title}{" (" + (currentIndex + 1) + " / " + (playlist.length) + ") "}</div>
      
      {hasMultipleSongs && (
        <div className = "playlist-control-buttons">
          <button onClick={prevSong}>{"<-"}</button>
          <button onClick={nextSong}>{"->"}</button>
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;