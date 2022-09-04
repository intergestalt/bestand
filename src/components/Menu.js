import React from 'react'
import styled from 'styled-components'

import { HeadText, Head } from './SectionHeader'
import { colors, dist, spaces, metrics, breakpoints, typoSizes, typoStyles, typoSnippet } from '../../config/styles'


export const Menu = function() {
  return (
    <Container>
      <Head backgroundColor="transparent">
        <HeadText backgroundColor="transparent">
          <svg className="knockout-text-container" height="100%">
            
            <rect className="knockout-text-bg" width="100%" height="96%" fill={colors.blue} x="0" y="0" fill-opacity="1" mask="url(#knockout-text)" />
            
            <mask id="knockout-text">
              <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
              <text x="50%" y="70%" fill="#000" text-anchor="middle">Bestand.global</text>
            </mask>
            
          </svg>
        </HeadText>        
 
      </Head>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top:0;
  z-index: 10;
  &, span {

  }
  svg {
    width:3.84em; /* just fits (TM) relative to monospaced Roboto font */
  }
  width: 100%;
`