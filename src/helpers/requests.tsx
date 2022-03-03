import axios from "axios";

const leaderboardsvc = axios.create({
    baseURL: "http://localhost:8080"
})

const validateAttemptService = async (guess: string) => {
    const request = await leaderboardsvc.post(`leaderboard/guess?guess=${guess}`)
    return request
}

export { leaderboardsvc, validateAttemptService }