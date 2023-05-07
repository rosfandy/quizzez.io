import { useEffect } from "react";

export default function QuizCard({
  resetQuiz,
  currentQuestionIndex,
  totalQuestions,
  currentQuestion,
  selectedAnswer,
  handleAnswerSelect,
  handlePrev,
  handleNext,
  handleSubmit,
  quizCompleted
}) {
  useEffect(() => {
  const storedAnswer = localStorage.getItem("selectedAnswer");
  if (storedAnswer) {
    handleAnswerSelect(null, storedAnswer);
  }

  if (currentQuestionIndex === totalQuestions - 1 && selectedAnswer !== "") {
    quizCompleted(true);
  }
}, [handleAnswerSelect, currentQuestionIndex, totalQuestions, selectedAnswer, quizCompleted]);


  function handleLabelClick(event, option) {
  handleAnswerSelect(event, option);
  localStorage.setItem("selectedAnswer", option);
  setTimeout(() => {
    handleNext();
  }, 500); // memberikan delay 1 detik sebelum pindah ke soal berikutnya
}

  return (
    <div className="rounded-lg w-[70vh] bg-white shadow px-4 py-4">
      <button
        className="font-bold text-[14px] rounded-md"
        onClick={resetQuiz}
      >
        Reset Quiz
      </button>

      <div className="card ">
        <div className="card-header pt-1 pb-3 text-[#696F79]">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="card-body ">
          <div
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            className="card-title  text-[16px] font-semibold py-2"
          ></div>
          <div className="form-check flex flex-col">
              {currentQuestion.incorrect_answers.map((option) => (
                <label
                  key={option}
                  onClick={(event) => handleLabelClick(event, option)}
                  className={`form-check-label py-4 px-4 shadow my-2 cursor-pointer rounded-md ${
                    selectedAnswer === option ? "bg-blue-400 text-white" : ""
                  }`}
                >
                  <input
                    className="form-check-input mr-4"
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerSelect}
                  />
                  <span dangerouslySetInnerHTML={{ __html: option }}></span>
                </label>
              ))}
            <label
              key={currentQuestion.correct_answer}
              className={`form-check-label py-4 px-4 shadow my-2 cursor-pointer rounded-md ${
                selectedAnswer === currentQuestion.correct_answer
                  ? "bg-blue-400 text-white"
                  : ""
              }`}
              onClick={(event) =>
                handleLabelClick(event, currentQuestion.correct_answer)
              }
            >
              <input
                className="form-check-input mr-4"
                type="radio"
                name="answer"
                value={currentQuestion.correct_answer}
                checked={selectedAnswer === currentQuestion.correct_answer}
                onChange={handleAnswerSelect}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.correct_answer,
                }}
              ></span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-6 bg-red-500 text-white py-1.5 px-4 text-[14px] rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
