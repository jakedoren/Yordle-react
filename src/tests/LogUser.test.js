import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { debug } from "console"
import { BrowserRouter } from "react-router-dom"
import Login from "../components/Login"
import { rest, server} from '../testServer'


describe('logs in / logs out user', () => {
    it('logs in user', async () => {
        const { container, findByText } = render(<BrowserRouter><Login /></BrowserRouter>)
        const setCookie = jest.fn(() => {return 'hi'})
        const usernameInput = container.getElementsByTagName('input')[0]
        const passwordInput = container.getElementsByTagName('input')[1]
        expect(usernameInput).not.toBe(null)
        expect(passwordInput).not.toBe(null)
        userEvent.type(usernameInput, 'username1')
        userEvent.type(passwordInput, 'password1')
        const loginBtn = await findByText('login')
        userEvent.click(loginBtn)
        debug()
        // const yordleText = await findByText('Yordle')
        // waitFor(() => expect(yordleText).not.toBe(null))
    })
})