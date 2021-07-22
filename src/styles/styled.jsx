import styled from '@emotion/styled'

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
  background-color: ${props => props.bg ? props.bg : ""}
`

let BButton = styled.button`
  color: ${props => props.color ? props.color : ""}
`


export { PrimaryButton, PrimaryForm, Div, BButton } 