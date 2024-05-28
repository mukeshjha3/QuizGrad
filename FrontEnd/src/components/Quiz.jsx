import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";

const baseURL = "http://localhost:8080/getset";
const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

// Utility function to format time
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false); // Updated to true initially
  const [timer, setTimer] = useState(1500); // 25 minutes
  const [status, setStatus] = useState("");
  const [intervalId, setIntervalId] = useState(null); // State to store interval ID

  const questionSet = async () => {
    try {
      const result = await fetch(baseURL);
      if (result.ok){
        const response = await result.json();
      setQuestions(response.question); // Fixed to access the correct data
      setLoading(false); // Set loading to false after data is fetched
      }
      else {
        console.log('error occured while converting the response of JavaScript Object...')
      }
    } catch (e) {
      console.log(e, "could not hit the backend Service....");
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    questionSet();
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    setIntervalId(id); // Store the interval ID

    return () => clearInterval(id);
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(intervalId); // Stop the timer

    // Calculate score and show result
    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      const newStatus = percentage >= 80 ? "Passed" : "Failed";      // passing marks is 80 
      setStatus(newStatus);

      setShowResult(true);
      setLoading(false);
    }, 3000);
  };

  const calculateScore = (userAnswers) => {
    let score = 0;
    for (const question of questions) {
      const userAnswer = userAnswers[question.questionNo];
      if (userAnswer && userAnswer === question.answer) {
        score++;
      }
    }
    return score;
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <QuizHeader timer={timer} />
      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
        {/* question section */}
        <div className="md:w-[70%] w-full">
          <div>
            {questions.map((element, index) => (
              <div
                key={element.questionNo}
                className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded"
              >
                <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                  <span className="h-8 w-8 bg-[#FCC822] rounded-full flex justify-center items-center text-green-800 mr-3">
                    {index + 1}
                  </span>
                  <p className="">{element.question}</p>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  {element.options.map((option) => (
                    <div
                      className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                        answers[element.questionNo] === option.optionText
                          ? "bg-yellow-300 text-gray-600"
                          : ""
                      }`}
                      key={option.optionText}
                      onClick={() => handleAnswerSelect(element.questionNo, option.optionText)}
                    >
                      <p>{option.optionText}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-[#FCC822] px-6 py-2 text-white rounded"
            >
              Submit Quiz
            </button>
          </div>
        </div>

        {/* answer  section*/}
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score: </h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
                <h3
                  className={`text-xl ${
                    status === "Passed" ? "text-green-800 text-4xl font-bold" : "text-red-600 text-4xl font-bold"
                  }`}
                >
                  {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score}
                  <span className="text-slate-800">/{questions.length}</span>
                </h1>
                <p className="text-sm flex justify-center items-center gap-2">
                  Total Time:{" "}
                  <span className="text-xl text-orange-500">
                    {formatTime(1500 - timer)} {/* 1500 seconds = 25 minutes */}
                    <span className="text-xs"> sec</span>
                  </span>
                </p>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-[#FCC822] text-white w-full py-2 rounded mt-16"
              >
                Restart
              </button>
            </div>
          )}

          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
