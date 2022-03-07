import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { validateAttemptService } from '../helpers/requests'

const server = setupServer(
    rest.post('http://localhost:8080/leaderboard/guess?guess', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ matches: { partialMatchIndexes: [0, 3], exactMatchIndexes: [1,2]}, correct: false })
        )
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

it('sends back guess', async () => {
    const res = await validateAttemptService('betty')
    console.log(res.data)
})