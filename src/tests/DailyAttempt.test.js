import { render, waitFor } from '@testing-library/react'
import { validateAttemptService } from '../helpers/requests'
import { server, rest } from '../testServer'
import userEvent from '@testing-library/user-event'
import DailyAttempt from '../components/DailyAttempt'

it('if user has attempted today, block them from continuing', async () => {
    const { debug, container, findByText } = render(<DailyAttempt />)
    const loadingText = await findByText('loading...')
    expect(loadingText).toContainHTML('loading...')
    const attmptedAlready = await findByText('Looks like you hava already attempted for the day, please come back tomorrow!')
    expect(attmptedAlready).not.toBe(null)
})

it('allows the user to continue if they have not attempted for the day', async () => {
    server.use(
        rest.get('http://localhost:8080/leaderboard/attempted', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(false)
            )
        })
    )
    const { debug, container, findByText } = render(<DailyAttempt />)
    const loadingText = await findByText('loading...')
    expect(loadingText).toContainHTML('loading...')
    const yordleText = await findByText('Yordle')
    expect(yordleText).not.toBe(null)
    expect(yordleText.innerHTML).toBe('Yordle')
})