import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./App.css";
import data from "./quiz.json";

function App() {
  const [currentqp, setCurrentqp] = useState(0);
  const [showscore, setShowscore] = useState(false);
  const [crt, setCrt] = useState(0);
  const [wrongAnswer, setWrong] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShuffledData(shuffleArray([...data]));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkAnswer = (item) => {
    setSelectedOption(item);
    setShowAnswer(true);

    if (item === shuffledData[currentqp].correct) {
      setCrt((prev) => prev + 1);
    } else {
      setWrong((prev) => [
        ...prev,
        {
          question: shuffledData[currentqp].question,
          correctansser: shuffledData[currentqp].correct,
        },
      ]);
    }

    setTimeout(() => {
      setShowAnswer(false);
      setSelectedOption(null);

      if (currentqp < shuffledData.length - 1) {
        setCurrentqp((prev) => prev + 1);
      } else {
        Swal.fire({
          title: "Good job!",
          text: "You Completed the Quiz!",
          icon: "success",
        });
        setShowscore(true);
      }
    }, 2000);
  };

  const reset = () => {
    setShowscore(false);
    setCurrentqp(0);
    setCrt(0);
    setWrong([]);
    setShuffledData(shuffleArray([...data]));
  };

  return (
    <>
      <h1>Current Affairs Quiz</h1>
      <h4>Current Score : {crt}</h4>
      <div className="container">
        {!showscore && shuffledData.length > 0 && (
          <>
            <h3>
              Question {currentqp + 1} out of {shuffledData.length}
            </h3>
            <h2 className="qp-head">{shuffledData[currentqp].question}</h2>
            <div className="options">
              {shuffledData[currentqp].options.map((item, index) => (
                <button
                  onClick={() => checkAnswer(item)}
                  key={index}
                  disabled={showAnswer}
                  style={{
                    backgroundColor: showAnswer
                      ? item === shuffledData[currentqp].correct
                        ? "green"
                        : item === selectedOption
                        ? "red"
                        : ""
                      : "",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {showscore && (
          <div>
            <h3 className="attend">You Attended all the Questions...!</h3>
            <p className="finalscore">
              Your Score is <strong>"{crt}"</strong> out of{" "}
              {shuffledData.length}
            </p>

            {wrongAnswer.length > 0 && (
              <div className="popup">
                <h3>Right Answers</h3>
                {wrongAnswer.map((item, index) => (
                  <p key={index}>
                    <span>{item.question}</span> -
                    <span>{item.correctansser}</span>
                  </p>
                ))}
              </div>
            )}

            <button className="reset" onClick={() => reset()}>
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
