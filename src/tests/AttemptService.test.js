import { render, waitFor } from '@testing-library/react'
import { validateAttemptService } from '../helpers/requests'
import { server, rest } from '../testServer'
import Wordle from '../components/Wordle'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

it('sends back guess', async () => {
    const res = await validateAttemptService('betty')
    expect(res.data.correct).toBe(false)
    expect(res.data.matches).not.toBeNull()
})

it ('handles failure', async () => {
    server.use(
        rest.post('http://localhost:8080/leaderboard/guess', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({ error: "401 unauthorized" })
        )
    })
    )
    try {
        const res = await validateAttemptService('betty')
    } catch(e) {
        expect(e.response.status).toBe(500)
        expect(e.response.data).toStrictEqual({ error: "401 unauthorized" })
    }
})

describe('it validates guess, and changes color of keys in guess according to exact and partial matches', () => {
    it('matches characters', async () => {
        const { debug, container } = render(<Wordle />)
        userEvent.keyboard('hello')
        const helloArray = ['h', 'e', 'l', 'l', 'o']
        const firstRow = container.getElementsByClassName
        ('grid-container')[0]
        const firstRowChildren = firstRow.getElementsByTagName('div')
        helloArray.forEach((char, i) => {
            expect(firstRowChildren[i].innerHTML).toBe(char)
        })
        const enterBtn = container.getElementsByTagName('button')[0]
        userEvent.click(enterBtn)
        const partialMatches = [firstRowChildren[0], firstRowChildren[3]]
        const exactMactches = [firstRowChildren[1], firstRowChildren[2]]
        await waitFor(() => expect(partialMatches[0].classList.contains('yellow')).toBe(true))
        partialMatches.forEach(match => {
            expect(match.classList.contains('yellow')).toBe(true)
        })
        exactMactches.forEach(match => {
            expect(match.classList.contains('green')).toBe(true)
        })
    })
})

it('gets username and jwt', async() => {
    const res = await axios.post(`${process.env.REACT_APP_USERSVC}/user/authenticate`, {username: "test", password: "password"})
    expect(res.data.jwt).toBe('12345')
    expect(res.data.username).toBe('john')
})