import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload';
import { useCMS } from 'tinacms'

export default function({ label, hide, children }) {
  if (hide && process.env.NODE_ENV === "production") return null
  //const cms = useCMS()
  const showLabel = /*( show || cms.sidebar.isOpen ) && */ process.env.NODE_ENV === "development"
  //console.log(cms.sidebar.hidden, "SIDEBAR")
  return <Wrapper hide={hide}>
    <LazyLoad height={400} offset={400} overflow={true}>
    {showLabel && <Label hide={hide}>{hide && "HIDDEN "}{label}</Label> }
      { children}
      </LazyLoad>
  </Wrapper>
}

const Wrapper = styled.div`
  position: relative;
  overflow:hidden;
  display: block;
  ${({ hide }) => hide && "text-decoration: line-through; color: grey; filter: brightness(100%) saturate(0%) opacity(50%); opacity: 0.6;" };
`

const Label = styled.div`
  position: absolute;
  left:0;
  transform: rotate(270deg) translateX(calc(-100% - 3px));
  transform-origin: 0 0;
  top:0;
  padding:0px;
  opacity: ${({ hide }) => hide ? 0.65 : 0.15 };
  z-index:100;
`