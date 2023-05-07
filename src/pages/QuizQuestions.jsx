import { useState, useEffect } from "react";
import QuizStart from "../components/QuizStart";
import opentdb from "../hook/opentdb";
import { Box } from '@mui/system';
import { Button, CircularProgress, Typography } from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';

function Quiz({dataSelected}) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isError, setIsError] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60);
  const [quiz, setDataQuiz] = useState({});
  const { response, error, loading } = opentdb({ url: `/api.php?amount=10&category=${dataSelected.Category}&difficulty=${dataSelected.Difficulty}&type=${dataSelected.Type}` });

  console.log(timeLeft)
  useEffect(() => {
    const savedQuizStarted = localStorage.getItem("quizStarted");
    const savedStartTime = localStorage.getItem("startTime");
    const savedTimeLeft = localStorage.getItem("timeLeft");

    if (savedQuizStarted && savedStartTime && savedTimeLeft) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
      const newTimeLeft = parseInt(savedTimeLeft) - elapsedTime;

      if (newTimeLeft > 0) {
        setIsQuizStarted(true);
        setTimeLeft(newTimeLeft);
      } else {
        localStorage.removeItem('quizStarted');
        localStorage.removeItem('startTime');
        localStorage.removeItem('timeLeft');
      }
    }
  }, []);

  
  useEffect(() => {
    let timer;

    if (isQuizStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [isQuizStarted, timeLeft]);

  useEffect(() => {
    if (isQuizStarted) {
      localStorage.setItem("quizStarted", true);
      localStorage.setItem("startTime", Date.now());
      localStorage.setItem("timeLeft", timeLeft);
    }
  }, [isQuizStarted, timeLeft]);

  useEffect(() => {
    const storedData = localStorage.getItem('quiz');
    let dataValid = JSON.parse(storedData)
      if (response && response.results.length === 0 && dataValid === null) {
        localStorage.removeItem("quizStarted");
        setIsError(true)        
        alert("Data Question Not Found")
        window.location.replace("/dashboard");
      } else {
        if (storedData == "null" ) {
          localStorage.setItem('quiz', JSON.stringify(response));
        } 
      }
  }, [loading]);

    const startQuiz = () => {
    localStorage.setItem("quizStarted", true);
    localStorage.setItem("startTime", Date.now());
    setIsQuizStarted(true);
  };

  const resetQuiz = () => {
    localStorage.removeItem('startTime');
    localStorage.removeItem('quizStarted');
    setIsQuizStarted(false);
    setTimeLeft(60);
  };  

  if(loading) {
    return (
      <Box mt={20} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } 
 
  return (
    <div className="">
      {!isError && (
        <div className="flex flex-col justify-center items-center min-h-screen">
          {isQuizStarted ? (
            <QuizStart timeLeft={timeLeft} resetQuiz={resetQuiz} quiz={response}/>
          ) : (
            <div className="px-12 py-8 flex flex-col justify-center">
              <h3 className="font-bold text-24 text"></h3>
              <p className="mt-4 mb-2 text-16 text-center">
                <span className="font-bold text-2xl "> Are you ready to start the quiz? </span>
              </p>
              <p className="mb-4 font-semibold text-[#696F79]">You will have {timeLeft} seconds to answer all the questions.</p>
              <div className="flex justify-center">
                <button
                  className="px-8 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
                  onClick={startQuiz}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );


}
export default Quiz;