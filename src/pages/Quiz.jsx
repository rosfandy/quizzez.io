import { useState, useEffect } from 'react';
import opentdb from '../hook/opentdb';
import { Box } from '@mui/system';
import { Button, CircularProgress, Typography } from '@mui/material';

import QuizQuestions from './QuizQuestions';
import SelectInput from '../components/FloatinLabelSelect';

export default function Quiz() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [selected, setSelected] = useState({});
  const [dataSelected, setDataSelected] = useState({});
  const { response, error, loading } = opentdb({ url: '/api_category.php' });

  useEffect(() => {
    const quizStarted = localStorage.getItem('quizStarted');
    if (quizStarted === 'true') {
      setStartQuiz(true);
    }
  }, []);

  useEffect(()=>{
        const mergedData = { ...dataSelected, ...selected };
        setDataSelected(mergedData);
  }, [selected])
  
  
  useEffect(() => {
    if (startQuiz) {
      localStorage.setItem('quizStarted', 'true');
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    }
  }, [startQuiz]);

  if (loading) {
    return (
      <Box mt={20} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const Category = response.trivia_categories;

  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choise' },
    { id: 'boolean', name: 'True/False' },
  ];
  const Difficulty = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const storedData = localStorage.getItem('quiz');
  if(storedData === null)   localStorage.setItem('quiz', "null");

  if (startQuiz) {
    return (
      <QuizQuestions
        dataSelected={dataSelected}
      />
    );
  }

  return (
    <div className="justify-center flex items-center min-h-screen">
      <div className="flex flex-col mt-[-12vh]">
        <div className="font-bold text-[24px] text-center text-[#696F79] py-8">Select Quiz</div>
        <div className="flex flex-col gap-y-4 ">
          <SelectInput
            category={Category}
            label="Category"
            onChange={(event) => setSelected(event.target.value)}
            setSelected={setSelected}
          />
          <SelectInput
            category={typeOptions}
            label="Type"
            setSelected={setSelected}
          />
          <SelectInput
            category={Difficulty}
            label="Difficulty"
            setSelected={setSelected}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => setStartQuiz(true)}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
