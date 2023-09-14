# Rather Labs Front-End Challenge Submission

## Getting Started

To run this project locally and review my submission, please follow these instructions:

1.  **Clone the Repository:**  
    `bash git clone git@github.com:FacuBozzi/rather-labs-challenge.git`
    `cd rather-labs-challenge`
2.  **Install Dependencies:**  
    `pnpm install`
3.  **Run the Application:**  
    `pnpm run dev`
4.  **Open your Browser:**
    Visit [http://localhost:3000](http://localhost:3000/) to see the application in action.

## Important Notes for Reviewer

Please keep the following points in mind while reviewing my submission:

1.  **Survey Choice:** The survey included in this project is a placeholder and was chosen randomly for the sake of demonstration. The main focus of this challenge is to showcase my front-end development skills and the integration with the $QUIZ token balance.
2.  **Token Balance Updates:** The balance of the $QUIZ token automatically updates when the $QUIZ smart contract emits the "Transfer" event. I have implemented a listener for this event, but please note that it may take a few seconds for the balance to update due to network latency and blockchain confirmation times.
3.  **No .env File:** In this simplified project, I have omitted the use of a .env file for environment variables. Normally, I would use a .env file to store sensitive information like API keys (e.g., Alchemy API key). For this submission, I have included the API key directly in the code to simplify the setup process for the reviewer.
4.  **Branching Strategy:** Given the simplicity of this project, I have used the main branch for development. In a real-world scenario, I would use a more structured branching strategy, such as feature branches with relevant names (e.g., "feature/xxx-xxx"), and merge them into the main branch as needed.

Thank you for taking the time to review my submission. If you have any questions or need further clarification on any aspect of the code or the project, please don't hesitate to reach out. I look forward to your feedback.

Best regards,
Facundo
