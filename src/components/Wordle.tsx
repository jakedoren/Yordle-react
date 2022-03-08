import React, { useEffect, useState } from 'react'
import { createScore } from '../helpers/helper'
import { leaderboardsvc } from '../helpers/requests'
import Keyboard from './Keyboard'

interface IError {
  error: boolean,
  message?: string
}

const Wordle = () => {
  const row1: string[] = []
  const row2: string[] = []
  const row3: string[] = []
  const row4: string[] = []
  const row5: string[] = []
  const row6: string[] = []
  
  const [attempt, setAttempt] = useState<number>(1)
  const [rowsArray, setRowsArray] = useState<Array<Array<string>>>([row1, row2, row3, row4, row5, row6]) 
  const [wordsArray, setWordsArray] = useState<string[]>(['betty', 'meggy'])
  const attemptRef = React.useRef(attempt)
  const [error, setError] = useState<IError>({error: false, message: ''})

  const incrementAttempt = () => {
    setAttempt(prevAttempt => prevAttempt + 1)
  }

  useEffect(() => {
    attemptRef.current = attempt
  }, [attempt])
  
  const guessContainingChar = async () => {
    const currentRow = rowsArray[attemptRef.current - 1]
    const wordRowContainer = (document.getElementById(`wordrow${attemptRef.current}`) as HTMLElement)
    const childDivs = wordRowContainer.getElementsByTagName('div')
    const guess = currentRow.join('')
    const response = await leaderboardsvc.post(`leaderboard/guess?guess=${guess}`)
    if(response.status !== 200) {
      setError({error: true, message: 'Sorry, the service could not complete your request, please try again or come back later'})
      return
    }
    const { data } = response
    const partialMatches: number[] = data.matches.partialMatchIndexes
    const exactMatches: number[] = data.matches.exactMatchIndexes
    if(partialMatches) {
      partialMatches.forEach((partialMatch) => {
        const child = childDivs[partialMatch]
        child.classList.add("yellow")
      })
    }
    if(exactMatches) {
      exactMatches.forEach((partialMatch) => {
        const child = childDivs[partialMatch]
        child.classList.add("green")
      })
    }
    return data.correct
  }
  
  const validateSubmission = async () => {
    const correctGuess = await guessContainingChar()
    if(attemptRef.current <=6 && correctGuess) {
      createScore({
        username: sessionStorage.getItem("username") || 'guest',
        attempts: attempt
      })
      console.log("winner!")
    } else if(attemptRef.current < 6){
        console.log("nope, try again")
    } else {
        createScore({
          username: sessionStorage.getItem("username") || 'guest',
          attempts: attempt
        })
        console.log("Game over")
    }
  }

  const mapCharToRowArray = (char: string): void => {
    const currentRow = rowsArray[attemptRef.current - 1]
    if(currentRow.length < 5) {
      currentRow.push(char)
    } else {
      console.log("The word must not be longer than 5 characters")
    }
  }
  
  const mapHtmlToWordInput = (): void => {
    const wordRowContainer = (document.getElementById(`wordrow${attemptRef.current}`) as HTMLElement)
    const childDivs = wordRowContainer.getElementsByTagName('div')
    const currentRow = rowsArray[attemptRef.current - 1]
    const child = childDivs[currentRow.length - 1]
    child.innerHTML = currentRow[currentRow.length - 1].valueOf()
  }
  
  return (
    <div className="App">
      <h1>Yordle</h1>
      <div id="app"></div>

    <div id="error"></div>
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
  <Keyboard mapCharToRowArray={mapCharToRowArray} mapHtmlToWordInput={mapHtmlToWordInput} validateSubmission={validateSubmission} incrementAttempt={incrementAttempt} attempt={attemptRef.current} rowsArray={rowsArray}/>
    </div>
  );
}

export default Wordle