import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import axios from "axios"
import { BrowserRouter } from "react-router-dom"
import { isConstructorDeclaration } from "typescript"
import App from "../App"
import Keyboard from "../components/Keyboard"
import Wordle from "../components/Wordle"
import { setCookie } from "../helpers/helper"

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
    debug()
})