import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  console.log(questions);

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* Map over questions and render QuestionItem for each question */}
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onDelete={() => deleteQuestion(question.id)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
