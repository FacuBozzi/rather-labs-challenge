import React, { useState, useEffect } from "react";
import surveyData from "../../survey/survey-sample.json"; // Import the survey data
import surveyABI from "../../survey/survey-abi.json"; // Import the survey data
import { ethers } from "ethers"; // Import ethers.js
import { contractAddress } from "@/utils/contractAddress"; //$QUIZ contract address

interface SurveyQuestion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: {
    text: string;
  }[];
}

const Survey: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]); // Store user's answers
  const [submitted, setSubmitted] = useState<boolean>(false);

  const surveyId = 1; //I didn't know what to pass as a _surveyId to the contract,

  const startSurvey = () => {
    setShowStartButton(false);
    setCountdown(surveyData.questions[currentQuestionIndex].lifetimeSeconds);

    // Start countdown timer
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimer(interval);
  };

  const stopSurvey = () => {
    // Clear the interval when questions are finished
    if (timer) {
      clearInterval(timer);
      setTimer(null); // Reset the timer state
    }
  };

  useEffect(() => {
    if (countdown <= 0 && !showStartButton && !submitted) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      handleAnswer(0);
    }
  }, [countdown]);

  console.log("answers", answers);

  const currentQuestion: SurveyQuestion | undefined =
    surveyData.questions[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prevAnswers) => {
      // Set the answer for the current question
      prevAnswers[currentQuestionIndex] = answerIndex;
      return [...prevAnswers];
    });

    // Move to the next question
    if (currentQuestionIndex < surveyData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountdown(
        surveyData.questions[currentQuestionIndex + 1].lifetimeSeconds
      );
    } else {
      // All questions are finished
      setSubmitted(true);
      stopSurvey(); //stops the timer
    }
  };

  const submitAnswers = async () => {
    // Use ethers.js to submit answers to the smart contract
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractABI = surveyABI; // Replace with your contract ABI

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      // Check if the user has not submitted answers before
      const cooldownSecondsBigNumber = await contract.cooldownSeconds(); // cooldownSeconds public variable in the contract
      const lastSubmittalBigNumber = await contract.lastSubmittal(
        signer.getAddress()
      );

      //Convert the big number into a number
      const cooldownSeconds = Number(cooldownSecondsBigNumber);
      const lastSubmittal = Number(lastSubmittalBigNumber);
      if (lastSubmittal + cooldownSeconds > Math.floor(Date.now() / 1000)) {
        console.error("Cooldown period not finished");
        return;
      }

      // Submit answers
      await contract.submit(surveyId, answers);

      // Handle successful submission
      console.log("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-primary-gray">
      {!submitted && (
        <div className="flex flex-col items-center">
          {showStartButton ? (
            <>
              <h1 className="text-3xl font-bold">{surveyData.title}</h1>
              <img
                src={surveyData.image}
                alt={surveyData.title}
                className="mt-4 mb-8 rounded-lg"
              />
              <button
                className="bg-primary-blue text-primary-gray px-4 py-2 rounded-lg"
                onClick={startSurvey}
              >
                Start Survey
              </button>
            </>
          ) : (
            <div className="mt-4 text-primary-gray flex flex-col items-center">
              <h2 className="text-xl font-semibold">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="mt-2">{currentQuestion.text}</p>
              <img
                src={currentQuestion.image}
                alt={currentQuestion.text}
                className="mt-4 rounded-lg max-h-[332px]"
              />

              {/* Countdown timer */}
              <p className="mt-4 text-lg">
                Time Remaining: {countdown} seconds
              </p>

              {/* Answer buttons */}
              <div className="mt-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="bg-primary-blue px-4 py-2 rounded-lg mr-4"
                    onClick={() => handleAnswer(index + 1)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mt-4text-primary-gray">
          <h2 className="text-primary-blue text-xl font-semibold">
            Answers Overview
          </h2>
          <ul className="list-disc ml-4">
            {answers.map((answer, index) => (
              <li key={index}>
                Question {index + 1}: Answer {answer}
              </li>
            ))}
          </ul>
          <button
            className="bg-primary-blue px-4 py-2 rounded-lg mt-4"
            onClick={submitAnswers}
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default Survey;
