import React, { useContext, useEffect, useState } from 'react'
import { useGlobalContext } from '../userContext'
// import { UserContext } from '../userContext'

const Wordle = () => {
    const row1: string[] = []
    const row2: string[] = []
    const row3: string[] = []
    const row4: string[] = []
    const row5: string[] = []
    const row6: string[] = []
  
  
    const [attempt, setAttempt] = useState<number>(0)
    const [rowsArray, setRowsArray] = useState<Array<Array<string>>>([row1, row2, row3, row4, row5, row6]) 
    const [wordsArray, setWordsArray] = useState<string[]>(['betty', 'meggy'])
    const attemptRef = React.useRef(attempt);

    const incrementAttempt = () => {
      attemptRef.current = attempt + 1
      setAttempt(prevAttempt => prevAttempt + 1)
    }
  
    const guessContainingChar = (): void => {
      console.log('triggered')
      const currentRow = rowsArray[attemptRef.current]
      const wordOfTheDay = wordsArray[0]
      let matchedLetters: string[] = [];
      currentRow.forEach((letter) => {
        if(wordOfTheDay.includes(letter)) {
          matchedLetters.push(letter)
        }
      })
      if(matchedLetters.length > 0) {
          matchedLetters.forEach((letter) => {
              let exactMatchIndexes: number[] = []
              let partialMatchIndexes: number[] = []
              for(let i = 0; i < currentRow.length; i++) {
                  if(currentRow[i] == letter && wordOfTheDay[i] == letter) {
                    exactMatchIndexes.push(i)
                  } else if(currentRow[i] == letter && wordOfTheDay[i] !== letter){
                    partialMatchIndexes.push(i)
                  }
              }
              const wordRowContainer = (document.getElementById(`wordrow${attemptRef.current + 1}`) as HTMLElement)
              const childDivs = wordRowContainer.getElementsByTagName('div')
              partialMatchIndexes.forEach((partialMatch) => {
                const child = childDivs[partialMatch]
                child.classList.add("yellow")
              })
              exactMatchIndexes.forEach((exactMatch) => {
                const child = childDivs[exactMatch]
                child.classList.add("green")
              })
          })
      }
    }
  
    const validateSubmission = (): void => {
      const currentRow = rowsArray[attempt]
      const wordOfTheDay = wordsArray[0]
      let guess = '';
      currentRow.map((letter) => {
          guess = guess + letter
      })
      guessContainingChar()
      if(attempt <= 5 && guess === wordOfTheDay) {
          console.log("winner!")
      } else if(attempt < 6){
          console.log("nope, try again")
      } else {
          console.log("Game over")
      }
  }
  
    const handleSubmit = (e: any) => {
      const currentRow = rowsArray[attemptRef.current]
      if(attemptRef.current < 5 && currentRow.length === 5) {
          validateSubmission()
          incrementAttempt()
      } else if(attempt === 5) {
          console.log("game over")
      } else {
        console.log("Must enter a 5 letter word")
      }
    }
  
    const mapCharToRowArray = (char: string): void => {
      const currentRow = rowsArray[attemptRef.current]
      if(currentRow.length < 5) {
        currentRow.push(char)
      } else {
        console.log("The word must not be longer than 5 characters")
      }
    }
  
    const mapHtmlToWordInput = (): void => {
      const wordRowContainer = (document.getElementById(`wordrow${attemptRef.current + 1}`) as HTMLElement)
      const childDivs = wordRowContainer.getElementsByTagName('div')
      const currentRow = rowsArray[attemptRef.current]
      const child = childDivs[currentRow.length - 1]
      child.innerHTML = currentRow[currentRow.length - 1].valueOf()
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
      window.addEventListener("keyup", (e) => {
        const { key, keyCode} = e
        console.log(e)
        if (keyCode >= 65 && keyCode <= 90) {
        // Alphabet upper case
            console.log(key)
            mapCharToRowArray(key.toLocaleLowerCase())
            mapHtmlToWordInput()
        } else if (keyCode >= 97 && keyCode <= 122) {
            // Alphabet lower case
            console.log(key)
            mapCharToRowArray(key)
            mapHtmlToWordInput()
        }
        if(key === "Backspace") {
            const currentRow = rowsArray[attemptRef.current]
            const wordRowContainer = (document.getElementById(`wordrow${attemptRef.current + 1}`) as HTMLElement)
            const childDivs = wordRowContainer.getElementsByTagName('div')
            const lastChild = childDivs[currentRow.length - 1]
            if(lastChild) {
                lastChild.innerHTML = ''
                currentRow.pop()
            } 
        }
        if(key === "Enter") {
            const currentRow = rowsArray[attemptRef.current]
            if(attemptRef.current < 5 && currentRow.length === 5) {
                validateSubmission()
                incrementAttempt()
            } else if(attemptRef.current === 5) {
                console.log("game Over")
            } else {
                console.log("Must enter a five letter word before continuing towards your next guess")
            }
        }
    })
    }, [])
  
    return (
      <div className="App">
        <div id="app"></div>
  
      <div id="error"></div>
      {/* {isLoggedIn.toString()} */}
    <div id="word-grid">
    
    <div className="grid-container" id="wordrow1">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
    
    <div className="grid-container" id="wordrow2">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  
    <div className="grid-container" id="wordrow3">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  
    <div className="grid-container" id="wordrow4">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  
    <div className="grid-container" id="wordrow5">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  
    <div className="grid-container" id="wordrow6">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item"></div>
    </div>
  </div>
  
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
      </div>
    );
}

export default Wordle