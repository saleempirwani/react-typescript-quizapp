import React, { useState } from 'react'
import { fetchQuestions } from './config/api';
import { Difficulty, QuestionState, UserAnswers } from './types';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard'

const TOTAL_QUESTIONS: number = 10

export default function App() {

  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(questions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver === false) {
      const answer = e.currentTarget.value
      const correct = answer === questions[number].correct_answer
      if (correct) setScore((prev) => prev + 1);
      const userAnswerObj: UserAnswers = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].question,
      }
      setUserAnswers(prev => [...prev, userAnswerObj])
    }
  }

  const next = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
      return
    }
    setNumber(nextQuestion)
  }

  return (<>
    <GlobalStyle />
    <Wrapper>
      <h1>Quiz App</h1>
      {(gameOver === false) || (userAnswers.length !== TOTAL_QUESTIONS) && (<button className="start" onClick={startTrivia}>Start</button>)}
      {(gameOver === false && <p className="score">{score}</p>)}
      {(loading === true) && <p>Loading Question...</p>}
      {(loading === false) && (gameOver === false) && <QuestionCard
        questionNum={number + 1}
        totalQuestion={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />}{
        (loading === false) && (gameOver === false) && (userAnswers.length === number + 1) && (number !== TOTAL_QUESTIONS - 1) &&
        <button className="next" onClick={next}>Next</button>
      }
    </Wrapper>
  </>
  )
}
