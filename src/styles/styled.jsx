import styled from '@emotion/styled'

function css(props) {
  const object = {
    m: "margin",
    p: 'padding',
    h: 'height',
    w: 'width',
    fs: 'font-size',
    fw: 'font-weight',
    ls: 'letter-spacing',
    c: 'color',
    d: 'display',
    jc: 'justify-content',
    bg: 'background',
    br: 'border-radius',
    b: 'border',
    t: 'transition',
    ff: 'flex-flow',
    ai: 'align-items',
    ta: 'text-align',
    pos: 'position',
    ow: 'overflow-wrap',
    ps: 'place-self',
  }
  const css = Object.entries(props).filter(([key, value]) => key in object).map(([key, value]) => `${object[key]}: ${value};`)
  return css
}
let PrimaryButton = styled.button`
    background-image: linear-gradient(to right, #5b6fff 0%, #0046e2 100%);
    padding: 10px 15px 10px 10px;
    text-align: center;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    -webkit-background-size: 200% auto;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.w ? props.w : "inherit"};
        
    &:hover {
      background-position: right center; 
      color: #fff;
      text-decoration: none;
    }
     
  }
`
let PrimaryForm = styled.input`
    outline: none;
    border: 2px #71717161 solid;
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 20px;
    color: #737373;
    &::placeholder {
      color: #bbbccc
    }
`

let Div = styled.div`
  ${css}
`

let BButton = styled.button`
  color: ${props => props.color ? props.color : ""}
`

let CardPremium = styled.div`
  ${css}
  color: ${props => props.color ? props.color : ""};
  width: fit-content;
  font-size: 20px;
  border-radius: 7px;
  padding: 5px 15px;
  margin: 10px 8vw;
`


export { PrimaryButton, PrimaryForm, Div, BButton, CardPremium } 