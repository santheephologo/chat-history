import React, { useEffect, useState, useRef } from "react";
import "./Chatbot_App.css";
import { LuSendHorizonal } from "react-icons/lu";
import { TbMessageDots } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import HistoryRow from "./component/HistoryRow";
import { io } from "socket.io-client";
import UserMsg from "./component/UserMsg";
import BotMsg from "./component/BotMsg";
const socket = io("ws://localhost:5000");
const ChatWidget = () => {
  const [viewHistory, setViewHistory] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [viewInitialPrompt, setViewInitialPrompt] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const chatboxRef = useRef(null);
  

  useEffect(() => {
    if (typing && viewInitialPrompt) {
      setViewInitialPrompt(false);
    }
  }, [typing, viewInitialPrompt]);

  useEffect(() => {
    socket.on("connect", () => {
      setConnectionError(false)
      console.log("connected")
      socket.emit("get_chat_list", { username: "66836f2ef640cff3cdaa0d50" });
    });
    
  }, []);

  useEffect(() => {
    socket.on("chat_list", (data) => {
      console.log(data)
      setChatList(data)
    });
    
  }, []);
  
  useEffect(() => {
    socket.on("disconnect", () => {
      setConnectionError(false)
      console.log("Socket.IO connection closed");
    });
  }, []);
  
  useEffect(() => {
    socket.on("response", (msg) => {
      setTyping(false);
      addMessage("Bot", msg);
    });

    return () => {
      socket.off("response");
    };
  }, []);

  useEffect(() => {
    socket.on("connect_error", (error) => {
      setConnectionError(true);
      setTyping(false);
      console.error("Socket.IO connection error:", error);
    });
  }, [])
  
  const addMessage = (sender, message) => {
    
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    console.log(messages)
  };

  const sendMessage = (message) => {
    if (message.trim() !=="" && !connectionError && !viewHistory) { 
      setInput("");
      setTyping(true);
      addMessage("User", message);
      socket.emit("message", { client_id: "66836f2ef640cff3cdaa0d50", message });
    }

  };

  const handleSend = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  const toggleFab = () => {
    setIsChatVisible(!isChatVisible);
    setViewHistory(false)
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat_bot_main__mx__fabs">
      <div className={`chat_bot_main__mx ${isChatVisible ? "chat_bot_main__mx__is-visible" : ""}`}>
        <div className="custom chat_bot_main__mx_header">
          <div className="chat_bot_main__mx_option">
            <div className="chat_bot_main__mx_option_inner">
              <div className="">
                <div className="chat_bot_main__mx_header_img_container">
                  <img
                    className="chat_bot_main__mx_header_img"
                    src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                  {
                    !connectionError && (<chatbot_span className="online-indicator"></chatbot_span>)  
                  }
                  {
                    connectionError && (<chatbot_span className="offline-indicator"></chatbot_span>)
                  }
                </div>
                
              </div>
              <div className="chat_bot_main__mx_name">
                <chatbot_span id="chat_bot_main__mx_head">Hologo AI</chatbot_span>
            {!typing && (
              <>
                {" "}
                <br />{" "}
                <chatbot_span className="agent type_loader_container">
                  Assistant
                </chatbot_span>{" "}
                <chatbot_span className="online"></chatbot_span>
              </>
            )}
            {typing && (
              <div className="type_loader_container">
                <div class="typing_loader"></div>
              </div>
            )}
              </div>
            </div>
            
            <chatbot_span
              id="chat_bot_main__mx_fullscreen_loader"
              className="chat_bot_main__mx_fullscreen_loader"
              onClick={toggleFullscreen}
            >
              <i
                className={`fullscreen zmdi ${isFullscreen ? "zmdi-window-restore" : "zmdi-window-maximize"}`}
              ></i>
            </chatbot_span>
          </div>
        </div>

        <div
          id="chat_bot_main__mx_fullscreen"
          ref={chatboxRef}
          className={`chat_bot_main__mx_conversion chat_bot_main__mx_converse ${(isFullscreen) ? "chat_bot_main__mx_fullscreen" : ""}`}
        >
          {
            !viewHistory ? (
              <>
          {viewInitialPrompt && !connectionError && (
            <>
              <div className="initial_prompt">How may I assist you?</div>
            </>
          )}
  
          {messages.map((msg, index) => (
            <chatbot_span
              key={index}
              className={`chat_bot_main__mx_msg_item ${msg.sender === "Bot" ? "chat_bot_main__mx_msg_item_admin" : "chat_bot_main__mx_msg_item_user"}`}
            >
              {msg.sender === "Bot" && (
                <div className="chat_bot_main__mx_avatar">
                  <img
                    src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                </div>
              )}
              {msg.message}
            </chatbot_span>
          ))}
          {
            connectionError && (
              <chatbot_span
              
              className={`chat_bot_main__mx_msg_item ${"chat_bot_main__mx_msg_item_admin" }`}
            >
              
                <div className="chat_bot_main__mx_avatar">
                  <img
                    src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                </div>
             
             <div className="connection_error">Connection error. Please check your connection</div>
          </chatbot_span>
              
            )
          }            
              </>
            ) : (
                
                <div className="history-section">
                  <div className="chat-history-single-row-header">Chat history</div>
                      {chatList.map((data, index) => (
                        <HistoryRow
                          key={index}
                          data={data}
                        />
                      ))}
                  </div>
              )
          }
        </div>
        <div className="fab_field">
          
            
                <a id="fab_send" className="chat_bot_main__mx_body_a chat_bot_main__mx__send_btn" onClick={() => sendMessage(input)}>
                  <i className=""><LuSendHorizonal /></i>
                </a>
                <textarea
                  id="chat_bot_main__mxSend"
                  name="chat_bot_main__mx_message"
                  placeholder="Send a message"
                  className="chat_bot_main__mx_field chat_bot_main__mx_message chat_bot_main__mx_field_input"
                  value={input}
                  disabled={connectionError || viewHistory}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleSend}
                ></textarea>
              
        </div>
      </div>
      <a
        id="prime"
        className={`fab custom ${isChatVisible ? "chat_bot_main__mx__is-visible  animate-view-spin" : ""}`}
        onClick={()=>{setViewHistory(!viewHistory)}}
          >
              <div className="chatbot_icon_mx_inner">
                  {
                      isChatVisible && (<div className="chatbot_icon_mx"><MdHistory /></div>)
                  }
                  {
                       !isChatVisible && (<div className="chatbot_icon_mx"><MdHistory /></div>)
                  }
             </div>
                  
      </a>
      <a
        id="prime"
        className={`fab custom ${isChatVisible ? "chat_bot_main__mx__is-visible  animate-view-spin" : ""}`}
        onClick={toggleFab}
          >
              <div className="chatbot_icon_mx_inner">
                  {
                      isChatVisible && (<div className="chatbot_icon_mx"><AiOutlineCloseCircle /></div>)
                  }
                  {
                       !isChatVisible && (<div className="chatbot_icon_mx"><TbMessageDots /></div>)
                  }
             </div>
                  
      </a>
    </div>
  );
};

export default ChatWidget;