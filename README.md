# UniEvent

An Inter-University Event Management System designed for departments to coordinate festivals, workshops, and seminars, and for students to track their academic engagement.

## Local Development Setup

To run this project on your own machine:

1.  **Extract the files**: Unzip the exported project folder.
2.  **Install Node.js**: Ensure you have Node.js (v18 or later) installed.
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your API keys:
    ```env
    GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
    ```
    *Note: You can get a Gemini API key from the [Google AI Studio](https://aistudio.google.com/).*
5.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
6.  **Access the App**:
    Open [http://localhost:9002](http://localhost:9002) in your browser.

## Key Features

- **Student Portal**: Browse events, join activities, and download verified participation certificates.
- **Departmental Tools**: AI-assisted event description generation and student roster management.
- **Admin Oversight**: System-wide event moderation and user directory audit.
- **AI Integration**: Powered by Genkit and Gemini for smart form generation and content writing.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI (Radix UI)
- **AI**: Genkit with Google Gemini
- **Icons**: Lucide React
