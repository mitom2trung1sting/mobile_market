"use client";
import CallIcon from "@mui/icons-material/Call";
import React, { useEffect, useRef } from "react";

const ChatBox: React.FC = () => {
  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);
  const openChatButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeChatButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const chatbox = chatboxRef.current;
    const chatContainer = chatContainerRef.current;
    const userInput = userInputRef.current;
    const sendButton = sendButtonRef.current;
    const openChatButton = openChatButtonRef.current;
    const closeChatButton = closeChatButtonRef.current;

    let isChatboxOpen = false; // Set the initial state to closed

    // Function to toggle the chatbox visibility
    const toggleChatbox = () => {
      if (chatContainer) {
        if (isChatboxOpen) {
          chatContainer.classList.add("opacity-0");
          chatContainer.classList.remove("opacity-100");
          setTimeout(() => chatContainer.classList.add("hidden"), 300);
        } else {
          chatContainer.classList.remove("hidden");
          setTimeout(() => {
            chatContainer.classList.remove("opacity-0");
            chatContainer.classList.add("opacity-100");
          }, 10);
        }
      }
      isChatboxOpen = !isChatboxOpen; // Toggle the state
    };

    // Add event listeners
    openChatButton?.addEventListener("click", toggleChatbox);
    closeChatButton?.addEventListener("click", toggleChatbox);

    const handleSendMessage = () => {
      if (userInput && chatbox) {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
          addUserMessage(userMessage);
          respondToUser(userMessage);
          userInput.value = "";
        }
      }
    };

    sendButton?.addEventListener("click", handleSendMessage);

    userInput?.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    });

    const addUserMessage = (message: string) => {
      if (chatbox) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("mb-2", "text-right");
        messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    };

    const addBotMessage = (message: string) => {
      if (chatbox) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("mb-2");
        messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    };

    const respondToUser = (userMessage: string) => {
      const responses: { [key: string]: string } = {
        "Địa chỉ của cụ thể của cửa hàng Tuấn Minh iStore ?":
          "Cửa hàng Tuấn Minh iStore đặt tại P.Trung Sơn- TP.Tam Điệp.",
        "Chính sách bảo hành của cửa hàng ?":
          "Bạn là người dùng của Tuấn Minh iStore.",
        "Tôi muốn có người yêu, cửa hàng có bán không ?":
          "Cửa hàng không bán người yêu, nhưng có thể giúp bạn tìm kiếm một người yêu.",
        "Cửa hàng có nhận thanh lý đồ cũ không ?":
          "Cửa hàng không nhận thanh lý đồ cũ.",
      };

      const response =
        responses[userMessage] || "Xin lỗi, tôi không hiểu câu hỏi của bạn.";

      setTimeout(() => {
        addBotMessage(response);
      }, 500);
    };

    return () => {
      // Cleanup event listeners on component unmount
      openChatButton?.removeEventListener("click", toggleChatbox);
      closeChatButton?.removeEventListener("click", toggleChatbox);
      sendButton?.removeEventListener("click", handleSendMessage);
      userInput?.removeEventListener("keyup", handleSendMessage);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          id="open-chat"
          ref={openChatButtonRef}
          className="bg-blue-500 space-x-2 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <CallIcon />
        </button>
      </div>
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="hidden opacity-0 transition-opacity duration-300 fixed bottom-16 right-4 w-96 z-50"
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Tuấn Minh iStore</p>
            <button
              id="close-chat"
              ref={closeChatButtonRef}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div
            id="chatbox"
            ref={chatboxRef}
            className="p-4 h-80 overflow-y-auto"
          >
            {/* Chat messages will be displayed here */}

            <div className="mb-2">
              <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                Xin chào! Tôi có thể giúp gì được cho bạn?.
              </p>
            </div>
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              ref={userInputRef}
              list="questions"
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="questions">
              <option value="Địa chỉ của cụ thể của cửa hàng Tuấn Minh iStore ?" />
              <option value="Chính sách bảo hành của cửa hàng ?" />
              <option value="Tôi muốn có người yêu, cửa hàng có bán không ?" />
              <option value="Cửa hàng có nhận thanh lý đồ cũ không ?" />
            </datalist>
            <button
              id="send-button"
              ref={sendButtonRef}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
