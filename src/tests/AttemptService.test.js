import { validateAttemptService } from '../helpers/requests'
import { server, rest } from '../testServer'

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