import React, { useState, useEffect } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import styled from 'styled-components'
import Fullscreen from "react-full-screen";
import fscreen from 'fscreen';
import debounce from 'debounce'

import { dist, colors, breakpoints } from '../../config/styles'
import ButtonLarge from './ButtonLarge'
import FullscreenButton from './FullscreenButton'

let timeoutHandler = null
let languageTracks = []
const initialLanguageTrack = "en"

const MainVideo = ({vimeoId, fullscreenButton=true, buttonColor, style={}, setPlayingCallback=null }) => { 
  const [vimeoPlayer, setVimeoPlayer] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [hover, setHover] = useState(false);
  const [currentLanguageTrack, setCurrentLanguageTrack] = useState(initialLanguageTrack);
  const [languageTracks, setLanguageTracks] = useState([]);

  const vimeoIdIsValid = (typeof (vimeoId) === "string" || typeof (vimeoId) === "number") && String(vimeoId).match(/[0-9]+/) !== null

  useEffect (
    () => {
      if (setPlayingCallback) {
        setPlayingCallback(playing)
      }
    },
    [playing],
  );

  const mouseMove = debounce(() => {
    setOverlay(true)
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }
    timeoutHandler = setTimeout(()=>setOverlay(false),2000)
  },10)

  const toggleLanguage = () => {
    const currentTrackIndex = languageTracks.findIndex(track => track.language === currentLanguageTrack)
    let newTrackIndex = currentTrackIndex + 1
    if (!languageTracks[newTrackIndex]) {
      newTrackIndex = 0
    }
    const newLanguage = languageTracks[newTrackIndex].language
    vimeoPlayer.enableTextTrack(newLanguage)
  }

  const triggerPlay = debounce(() => {
    (playing === shouldPlay) && setShouldPlay(!shouldPlay)
  }, 200, true)

  return  <Fullscreen
      enabled={fullscreen}
      onChange={f => setFullscreen(f)}
    >
    <Container 
        style={style}
        isFullscreen={fullscreen} 
        onMouseEnter={()=>setHover(true)} 
        onMouseLeave={()=>setHover(false)}
      >
      {vimeoIdIsValid ? 
        <Vimeo
          style={{
            position:"relative",
            /*top:"50%"*/
          }}
          video={vimeoId}
          responsive
          play={shouldPlay}
          loop
          paused={!shouldPlay}
          controls={false}
          volume={1}
          onPlay={ () => {setPlaying(true); setOverlay(false)} }
          onPause={ () => setPlaying(false) }
          onEnd={ () => {setPlaying(false); setShouldPlay(false)} }
          onError={ () => {setPlaying(false); setShouldPlay(false)} }
          onLoaded={ () => setLoaded(true)}
          onReady={player => { 
            setVimeoPlayer(player); 
            player.getTextTracks().then(function (tracks) {
              setLanguageTracks(tracks)
              console.log(tracks)
              player.enableTextTrack(initialLanguageTrack).then( (track) => {
                setCurrentLanguageTrack(track.language)
              })
            }).catch(function (error) {
              console.warn("text track error", error)
            });
            player.on("texttrackchange", newTrack => {
              setCurrentLanguageTrack(newTrack.language)
            })
          }}
        /> 
      :
        <Error>
          <span>
            "{vimeoId}" is not a valid vimeo ID
            </span>
        </Error>
      }
      <Overlay show={overlay || !playing} onClick={triggerPlay} style={{mixBlendMode: "screen"}}>
        <ButtonContainer style={{mixBlendMode: "screen"}}>
          { loaded &&
            <div style={{opacity: shouldPlay ? "0.8" : "1", transition: "opacity 1s", mixBlendMode: "screen" }}>
              <ButtonLarge highlight={!!buttonColor} color={buttonColor} style={{mixBlendMode: "screen", fontWeight: "500"}}
                  >
                { "PLAY"}
              </ButtonLarge>
            </div>
          }
        </ButtonContainer>
      </Overlay>
      { fullscreenButton && fscreen.fullscreenEnabled &&
        <FullscreenButtonContainer>
          <FullscreenButton 
            onClick={ event => { setFullscreen(!fullscreen) } }
            isOn={fullscreen}
          />
        </FullscreenButtonContainer>
      }
      {playing &&
        <LanguageTrackButtonContainer>
          <LanguageTrackButton onClick={toggleLanguage}>
            {
              currentLanguageTrack
            }
          </LanguageTrackButton>
        </LanguageTrackButtonContainer>
    }
    </Container>
  </Fullscreen>
}

export default MainVideo

const Container = styled.div`
  margin-bottom: ${dist.spacer};
  @media ${ breakpoints.small } {
    margin-bottom: ${dist.smallSpacer};
  }
  box-sizing: content-box;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background: rgba(0,0,0,0.1);
  position: relative;
  ${ props => props.isFullscreen && "top:50%; transform:translateY(-50%)" };
  cursor: pointer;
` 

const Overlay = styled.div`
  transition: opacity 0.35s, background-image 1.6s;
  opacity: ${ props => props.show ? 1 : 0};
  position: absolute;
  height: 100%;
  width: 100%;
  /*background-image: linear-gradient(0deg, ${colors.bg}77 0%, ${colors.bg}00 25%);*/
  top: 0;
  left:0;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  text-align: center;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const FullscreenButtonContainer = styled.div`
  position: absolute;
  bottom: ${ dist.spacer };
  right: ${ dist.spacer };
  @media ${ breakpoints.small } {
    bottom: ${ dist.smallSpacer };
    right: ${ dist.smallSpacer };    
  }
`

const LanguageTrackButtonContainer = styled.div`
  position: absolute;
  top: ${dist.spacer};
  right: ${dist.spacer};
  @media ${breakpoints.small} {
    top: ${dist.smallSpacer};
    right: ${dist.smallSpacer};    
  }
`

const LanguageTrackButton = styled.span`
  background-color: white;
  border-radius: 50%;
  width:40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`

const Error = styled.div`
  background-color: red;
  font-size: 30px;
  display: flex;
  align-items: center;
  place-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
`