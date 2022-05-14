import React from 'react'
import { ButtonWrapper, Wrapper } from './QuestionCard.styles';

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
        <Wrapper>
            <p className="number">
                Question: {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer: string, index: number) => (
                    <ButtonWrapper key={index}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button disabled={userAnswer ? true : false} onClick={callback} value={answer}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}

export default QuestionCard