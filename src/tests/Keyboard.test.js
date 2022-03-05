import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom"
import Wordle from "../components/Wordle"

it('enters character on the screen', async () => {
    const { debug, container } = render(<BrowserRouter><Wordle /></BrowserRouter>)
    userEvent.keyboard('a')
    const firstBox = container.getElementsByClassName('grid-item')[0]
    expect(firstBox.innerHTML).toContain('a')
})

it('enters a five letter word with the keyboard', () => {
    const { debug, container } = render(<BrowserRouter><Wordle /></BrowserRouter>)
    userEvent.keyboard('hello')
    const helloArray = ['h', 'e', 'l', 'l', 'o']
    const firstRow = container.getElementsByClassName
    ('grid-container')[0]
    const firstRowChildren = firstRow.getElementsByTagName('div')
    helloArray.forEach((char, i) => {
        expect(firstRowChildren[i].innerHTML).toBe(char)
    })
})

it('enters a guess and continues to the next line', () => {
    const { debug, container } = render(<BrowserRouter><Wordle /></BrowserRouter>)
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
    userEvent.keyboard('flask')
    const flaskArray = ['f', 'l', 'a', 's', 'k']
    const secondRow = container.getElementsByClassName('grid-container')[1]
    const secondRowChildren = secondRow.getElementsByTagName('div')
    flaskArray.forEach((char, i) => {
        expect(secondRowChildren[i].innerHTML).toBe(char)
    })
})

it('goes through the wordle guess flow and maps all characters to their respective grid box', () => {
    const { debug, container } = render(<BrowserRouter><Wordle /></BrowserRouter>)
    const gridContainers = container.getElementsByClassName('grid-container')
    const enterBtn = container.getElementsByTagName('button')[0]
    for(let i = 0; i < gridContainers.length; i++) {
        const childDivs = gridContainers[i].getElementsByTagName('div')
        userEvent.keyboard('flask')
        const guessArray = ['f', 'l', 'a', 's', 'k']
        guessArray.forEach((char, i) => {
            expect(childDivs[i].innerHTML).toBe(char)
        })
        userEvent.click(enterBtn)
    }
})