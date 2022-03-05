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
    const { getByText, debug, getAllByText, container } = render(<BrowserRouter><Wordle /></BrowserRouter>)
    userEvent.keyboard('a')
    const hi = container.getElementsByClassName('grid-item')
    expect(hi[0].innerHTML).toContain('a')
    debug()
})