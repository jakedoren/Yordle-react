import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Wordle from './Wordle'

const DailyAttempt = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [attemptedToday, setAttemptedToday] = useState<boolean>(false)

    useEffect(() => {
        const username = sessionStorage.getItem('username')
        axios.get(`http://localhost:8080/leaderboard/attempted?username=${username}`)
          .then(res => {
            if(res.data == true) {
              setAttemptedToday(true)
            } 
            setLoading(false)
          })
          .catch(err => console.log(err))
      }, [])

  return (
    <>
        {loading ? <p>loading...</p> : 
            attemptedToday ? 
            <p>Looks like you hava already attempted for the day, please come back tomorrow!</p> :
            <Wordle />
        }
    </>
  )
}

export default DailyAttempt