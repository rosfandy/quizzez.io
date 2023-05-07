import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";

export default function QuizStart({ timeLeft, resetQuiz }) {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalAnsweredQuestions, setTotalAnsweredQuestions] = useState(0);

  let quiz = localStorage.getItem("quiz");
  quiz = JSON.parse(quiz);

  const totalQuestions = quiz.results.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentQuestionIndex");
    return storedIndex !== null ? parseInt(storedIndex, 10) : 0;
  });

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("selectedAnswers");
    return storedAnswers !== null ? JSON.parse(storedAnswers) : {};
  });

    useEffect(() => {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString());
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    setTotalAnsweredQuestions(Object.keys(selectedAnswers).length);
    if (quizCompleted) {
      localStorage.removeItem("timeLeft");
    }
  }, [currentQuestionIndex, selectedAnswers, quizCompleted]);


  const handleAnswerSelect = (event, option) => {
  const answer = option;
  setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestionIndex]: answer }));
};

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  const handleComplete = () => {
    setQuizCompleted(false);
    localStorage.removeItem("quizStarted");
    localStorage.removeItem("startTime");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("selectedAnswers");
    localStorage.setItem("quiz", "null");
    window.location.replace("/dashboard");
  };

  const currentQuestion = quiz.results[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex] || "";

  const correctAnswers = quiz.results.filter((question, index) => {
    return question.correct_answer === selectedAnswers[index];
  });

  const score = (correctAnswers.length / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex justify-center flex-col">
      {timeLeft === 0 || quizCompleted ? (
        <div className="flex flex-col justify-center">
          <div className="font-bold text-3xl text-center pb-2 ">
            {timeLeft === 0 ? "Time's Up!" : "Quiz Completed!"}
          </div>
          <div className="font-semibold text-center text-[#696F79] pt-4 pb-2">
            You answered {totalAnsweredQuestions} out of {totalQuestions} questions.
          </div>
          <div className="font-semibold text-center text-[#696F79] pb-8">
            You scored {score.toFixed(2)}% ({correctAnswers.length} out of {totalQuestions}).
          </div>
          <button className="font-bold text-[14px] text-center text-white py-2  bg-[#2B78E4] rounded-xl" onClick={handleComplete}>
            Back to Dashboard
          </button>
        </div>
      ) : (
        <div>
          <div className="font-bold text-center pb-2">Time Left: {timeLeft} seconds</div>
          <QuizCard
            resetQuiz={resetQuiz}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            handleAnswerSelect={handleAnswerSelect}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleSubmit={handleSubmit}
            quizCompleted={setQuizCompleted}
          />
          </div>
        )}
    </div>
  );
}
