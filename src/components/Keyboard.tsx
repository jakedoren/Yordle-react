import { MouseEventHandler, useEffect } from 'react'

interface IKeyboardProps {
    handleSubmit: MouseEventHandler<HTMLButtonElement>
}

const Keyboard = ({ handleSubmit }: IKeyboardProps) => {

  return (
    <div id="keyboard">
    <div id="row1">
      <span>q</span>
      <span>w</span>
      <span>e</span>
      <span>r</span>
      <span>t</span>
      <span>y</span>
      <span>u</span>
      <span>i</span>
      <span>o</span>
      <span>p</span>
    </div>
  
    <div id="row1">
      <span>a</span>
      <span>s</span>
      <span>d</span>
      <span>f</span>
      <span>g</span>
      <span>h</span>
      <span>j</span>
      <span>k</span>
      <span>l</span>
    </div>
  
    <div id="row3">
      <span>z</span>
      <span>x</span>
      <span>c</span>
      <span>v</span>
      <span>b</span>
      <span>n</span>
      <span>m</span>
    </div>
    
    <button id="enter" onClick={handleSubmit}>Enter</button>
    <button id="backspace">Backspace</button>
  </div>
  )
}

export default Keyboard