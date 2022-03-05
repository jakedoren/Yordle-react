import { MouseEventHandler, useEffect } from 'react'
import { createScore } from '../helpers/helper'

interface IKeyboardProps {
    mapCharToRowArray: Function,
    mapHtmlToWordInput: Function,
    validateSubmission: Function,
    incrementAttempt: Function, 
    attempt: number,
    rowsArray: Array<Array<string>>
}

const Keyboard = ({ mapCharToRowArray, mapHtmlToWordInput, validateSubmission, incrementAttempt, attempt, rowsArray }: IKeyboardProps) => {

  const keyPressHandler = (e: any): void => {
    const { key, keyCode} = e
      if (keyCode >= 65 && keyCode <= 90) {
      // Alphabet upper case
          mapCharToRowArray(key.toLocaleLowerCase())
          mapHtmlToWordInput()
      } else if (keyCode >= 97 && keyCode <= 122) {
          // Alphabet lower case
          mapCharToRowArray(key)
          mapHtmlToWordInput()
      }
      if(key === "Backspace") {
          const currentRow = rowsArray[attempt - 1]
          const wordRowContainer = (document.getElementById(`wordrow${attempt - 1}`) as HTMLElement)
          const childDivs = wordRowContainer.getElementsByTagName('div')
          const lastChild = childDivs[currentRow.length - 1]
          if(lastChild) {
              lastChild.innerHTML = ''
              currentRow.pop()
          } 
      }
      if(key === "Enter") {
          const currentRow = rowsArray[attempt - 1]
          if(attempt < 6 && currentRow.length === 5) {
              validateSubmission()
              incrementAttempt()
          } else if(attempt === 6) {
              console.log("game Over")
              createScore({
                username: sessionStorage.getItem("username") || 'guest',
                attempts: attempt
              })
          } else {
              console.log("Must enter a five letter word before continuing towards your next guess")
          }
      }
  }

    useEffect(() => {
    const keyBoard = document.getElementById('keyboard')
    const keyElements = keyBoard?.getElementsByTagName('span')
    if(keyElements && keyElements?.length) {
      for(let i = 0; i < keyElements?.length; i++) {
        const keyElement = keyElements[i]
        keyElement.addEventListener("click", (e) => {
            const element = (e.target as HTMLElement)
            const key = element?.innerHTML
            mapCharToRowArray(key)
            mapHtmlToWordInput()
        })
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keyup", keyPressHandler)
  }, [])

  const handleSubmit = (e: any) => {
    const currentRow = rowsArray[attempt - 1]
    if(attempt < 5 && currentRow.length === 5) {
        validateSubmission()
        incrementAttempt()
    } else if(attempt === 6) {
        console.log("game over")
        createScore({
          username: sessionStorage.getItem("username") || 'guest',
          attempts: attempt
        })
    } else {
      console.log("Must enter a 5 letter word")
    }
  }

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