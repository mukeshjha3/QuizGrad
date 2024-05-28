import React from 'react';

const FeaturePage = () => {
  return (
    <>
    <h2 className="text-3xl md:text-4xl text-gray-600 mb-3 mt-8 text-center">
          Key Features of QuizGrad Application
        </h2>
    <div className="bg-white-200 min-h-screen p-4">
      <div className="max-w-4xl p-8 md:p-12 mx-4 lg:mx-0">
        <div className="  space-y-8">
          <FeaturePoint
            title="Stack-Based Quizzes"
            points={[
              " QuizGrad offers stack-based quizzes tailored to specific tech stacks such as AWS, Spring Boot, Node.js, Django, React, Angular, Vue.js, and more.",
              "Quizzes are designed to test candidates' knowledge and proficiency in particular technology stacks.",
              "Each quiz covers various topics within the chosen stack, ensuring comprehensive assessment.",
              "Candidates can select quizzes based on their expertise or areas they want to give test upon."
            ]}
          />
          <FeaturePoint
            title="Highly Customizable Quizzes"
            points={[
              "QuizGrad allows companies to customize quizzes according to their specific requirements.",
              "Customization options include stack selection, difficulty level, duration, and specific topics.",
              "Companies can align quizzes with their objectives and assess candidates effectively.",
              "The flexibility in customization ensures that quizzes cater to the company's unique needs."
            ]}
          />
          <FeaturePoint
            title="Dynamic Question Sets"
            points={[
              "Tailwind QuizApp generates new sets of questions for each candidate.",
              "Questions are selected randomly from a large pool, ensuring variety and unpredictability.",
              "This prevents cheating and ensures fairness by providing unique question sets to each candidate.",
              "Candidates face different sets of questions each time they take the quiz, maintaining integrity."
            ]}
          />
          <FeaturePoint
            title="Timed Assignments"
            points={[
              "QuizGrad offers timed assignments to evaluate candidates' ability to perform under pressure.",
              "Candidates are required to answer a specific number of questions within a set time limit.",
              "For example, candidates may need to answer 50 questions in 25 minutes.",
              "This feature assesses candidates' time management skills and ability to work efficiently under constraints."
            ]}
          />
        </div>
      </div>
    </div>
    </>
  );
};

const FeaturePoint = ({ title, points }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-yellow-500">{title}</h3>
      <ul className="list-disc text-gray-500">
        {points.map((point, index) => (
          <li key={index} className="mb-2"><em>{point}</em></li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturePage;
