import { shuffleArray } from "./utils";

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endPoint: string = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    try {
        const response = await (await fetch(endPoint)).json()
        const data = response.results.map((question: Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])

        }))

        console.log("Data =========> ", data)
        return data
    } catch (error) {
        // console.log("ERR [fetchQuestions] =============> ", error)
    }
}