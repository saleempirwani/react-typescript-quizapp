import React from 'react'

export type UserAnswers = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string
}


type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: UserAnswers | undefined;
    questionNum: number
    totalQuestion: number
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestion,
}) => {
    return (
        <div>
            <p className="number">
                Question: {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer: string, index: number) => (
                    <div key={index}>
                        <button disabled={!!userAnswer} onClick={callback} value={answer}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard