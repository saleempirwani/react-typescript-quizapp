import { Difficulty, Question } from "../types";
import { shuffleArray } from "./utils";


export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endPoint: string = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    try {
        const response = await (await fetch(endPoint)).json()
        return response.results.map((question: Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])

        }))
    } catch (error) {
        // console.log("ERR [fetchQuestions] =============> ", error)
    }
}