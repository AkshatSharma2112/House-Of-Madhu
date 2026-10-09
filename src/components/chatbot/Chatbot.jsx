import { useEffect, useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Madhu 🧶 Your House of Madhu assistant. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // Open chatbot from Footer FAQ button
  // --------------------------------------------------

  useEffect(() => {
    const openChatbot = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-madhu-chatbot", openChatbot);

    return () => {
      window.removeEventListener("open-madhu-chatbot", openChatbot);
    };
  }, []);

  // --------------------------------------------------
  // Send message to AI backend
  // --------------------------------------------------

  const sendMessage = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    // Add customer's message
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: trimmedQuestion,
      },
    ]);

    // Clear input
    setQuestion("");

    // Show loading state
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: trimmedQuestion,
          }),
        }
      );

      // Check server response
      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      // Add Madhu's response
      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          text: data.answer,
        },
      ]);

    } catch (error) {
      console.error("Chatbot error:", error);

      // Show friendly error message
      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          text:
            "Sorry, I'm unable to respond right now. Please try again.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Handle Enter key
  // --------------------------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // --------------------------------------------------
  // Chatbot UI
  // --------------------------------------------------

  return (
    <>
      {/* ================================================
          FLOATING CHATBOT BUTTON
          ================================================ */}

      {!isOpen && (
        <button
          className="chatbot-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Madhu chatbot"
        >
          💬
        </button>
      )}


      {/* ================================================
          CHATBOT WINDOW
          ================================================ */}

      {isOpen && (
        <div className="chatbot-container">

          {/* ----------------------------------------------
              HEADER
              ---------------------------------------------- */}

          <div className="chatbot-header">

            <div className="chatbot-header-info">

              <div className="chatbot-avatar">
                🧶
              </div>

              <div>
                <h3>Madhu</h3>

                <span>
                  House of Madhu Assistant
                </span>
              </div>

            </div>


            {/* Close button */}

            <button
              className="chatbot-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>

          </div>


          {/* ----------------------------------------------
              MESSAGES
              ---------------------------------------------- */}

          <div className="chatbot-messages">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`chatbot-message ${
                  message.role === "user"
                    ? "chatbot-user-message"
                    : "chatbot-bot-message"
                }`}
              >
                {message.text}
              </div>

            ))}


            {/* Typing indicator */}

            {loading && (

              <div
                className="chatbot-message chatbot-bot-message chatbot-loading"
              >
                Madhu is typing...
              </div>

            )}

          </div>


          {/* ----------------------------------------------
              INPUT AREA
              ---------------------------------------------- */}

          <div className="chatbot-input-area">

            <input
              type="text"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask Madhu anything..."
              disabled={loading}
            />


            <button
              onClick={sendMessage}
              disabled={
                loading || !question.trim()
              }
              aria-label="Send message"
            >
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;