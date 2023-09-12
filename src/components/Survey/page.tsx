import React, { useState, useEffect } from "react";
import survey from "../../survey/survey-sample.json"; // Import the survey

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);

  const startSurvey = () => {
    setShowStartButton(false);
    // You can implement the logic to start the survey here
  };

  const currentQuestion = survey.questions[currentQuestionIndex];
  const lifetimeSeconds = currentQuestion ? currentQuestion.lifetimeSeconds : 0;

  useEffect(() => {
    if (showStartButton) return;
    // Implement logic to move to the next question after a certain time
    const timer = setTimeout(() => {
      if (currentQuestionIndex < survey.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle the case where all questions are finished
      }
    }, lifetimeSeconds * 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, showStartButton]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-primary-gray text-3xl font-bold">{survey.title}</h1>
      {showStartButton && (
        <>
          <img
            src={survey.image}
            alt={survey.title}
            className="mt-4 mb-8 rounded-lg"
          />
          <button
            className="bg-primary-blue text-primary-gray px-4 py-2 rounded-lg"
            onClick={startSurvey}
          >
            Start Survey
          </button>
        </>
      )}

      {currentQuestion && !showStartButton && (
        <div className="mt-4">
          {/* <h2 className="text-primary-blue text-xl font-semibold">
            Question {currentQuestionIndex + 1}
          </h2> */}
          <p className="mt-2 text-primary-gray">{currentQuestion.text}</p>
          <img
            src={currentQuestion.image}
            alt={currentQuestion.text}
            className="mt-4 rounded-lg max-h-[320px]"
          />
          {/* Render options here */}
        </div>
      )}

      {/* Implement logic to show answers and submit button when all questions are finished */}
    </div>
  );
};

export default Survey;
