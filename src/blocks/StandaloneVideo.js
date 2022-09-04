import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { use100vh } from 'react-div-100vh'
import { Helmet } from 'react-helmet'

import MainVideo from '../components/MainVideo'
import {p as P, Block} from '../components/HtmlElements'
import { 
  BlockListItem, 
  BlockWrapper } from '../components'

import { snippets, colors } from '../../config/styles'
import { genericFields } from '../helpers/misc'

const blockLabel = "Subpage VIDEO"

export function StandaloneVideo({ data }) {
  const {videoId, hide} = data

  //const height100vh = use100vh()

  const [height100vh, setHeight100vh] = useState(0)
  const [playing, setPlaying] = useState(false)

  const updateDimensions = () => {
    const vh = window.innerHeight;
    setHeight100vh(vh)
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('orientationchange', () => setTimeout(updateDimensions, 100))
  });


  return (
    <BlockWrapper label={blockLabel} hide={hide}>
      <Container height100vh={height100vh}>
        <Back show={!playing}>
          <Link to="/">Bestand.global</Link>
        </Back>
        <VideoContainer height100vh={height100vh}>
          <MainVideo vimeoId={videoId} style={{ marginBottom: 0 }} setPlayingCallback={setPlaying} />
        </VideoContainer>
      </Container>
      <Helmet>
        <style type="text/css">{`
          [class^=SiteWrapper], html, body, #___gatsby, #gatsby-focus-wrapper, [class^=BlockWrapper] {
            background-color: black !important;
            /*height: 100%;*/
          }
        `}</style>
      </Helmet>
    </BlockWrapper>
  )
}

const Container = styled.div`
  height: 100%;
  height: ${ props => props.height100vh + "px"};
  width: 100vw;
  top:0;
  left: 0;
  background-color: black;
  display: flex;
  align-items: center;
  place-content: center;

`

const VideoContainer = styled.div`
  width: 100%;
  max-width: calc( 100vh * 16 / 9 );
  max-width: ${ props => props.height100vh * 16 / 9 }px;
`

const Back = styled.div`
  ${snippets.blockStyle}
  position: absolute;
  top:0;
  left:0;
  * {
    color: ${colors.turquoise};
  }
  //text-shadow: 0.1ex 0.1ex 0.1em #0005;
  z-index: 1;
  opacity: ${ props => props.show ? 1 : 0};
  transition: opacity 0.5s;
  @media screen and (min-aspect-ratio: 21/9) {
    opacity: 1;
  }
  @media screen and (max-aspect-ratio: 1/1) {
    opacity: 1;
  }
`

export const StandaloneVideoBlock = {
  label: blockLabel,
  name: "standaloneVideo",
  itemProps: (item) => ({
    label: <BlockListItem label={blockLabel} preview={item.text} hide={item.hide} />,
  }),  
  defaultItem: {
    videoId: "370256053",
  },
  fields: [
    { name: "videoId", label: "Vimeo Video ID", component: "text" },
    ...genericFields
  ],
}
