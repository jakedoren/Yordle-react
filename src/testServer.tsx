import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.post('http://localhost:8080/leaderboard/guess', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ matches: { partialMatchIndexes: [0, 3], exactMatchIndexes: [1,2]}, correct: false })
        )
    }),
    rest.post("*", (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`),
        ctx.status(500),
        ctx.json({ error: "please add request handler"})
    }),
    rest.get('http://localhost:8080/leaderboard/attempted', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(true)
        )
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }