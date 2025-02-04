"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket = io()
export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // socket = io();

  useEffect(() => {
    

    socket.on("setDone", (elem) => {
      setMessages((prevState) =>
        prevState.map((item, index) =>
          index == elem.itemIndex
            ? Object.assign({}, item, { value: !elem.value })
            : item
        )
      );
    });

    socket.on("addMessage", (elem) => {
      setMessages((prevState) => [
        ...prevState,
        { name: elem.name, value: elem.value },
      ]);
    });
  }, []);

  const testFunc = (itemValue, itemIndex) => {
    setMessages((prevState) =>
      prevState.map((item, index) =>
        index == itemIndex
          ? Object.assign({}, item, { value: !itemValue })
          : item
      )
    );
    socket.emit("setDone", { value: itemValue, itemIndex });
  };

  const sendMessage = () => {
    setMessages((prevState) => [...prevState, { name: message, value: false }]);
    socket.emit("addMessage", { name: message, value: false });
    setMessage("");
  };

  return (
    <div className="flex flex-col m-5">
      <h1>Real-Time Chat</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Nazwa produktu"
      />

      <button
        onClick={sendMessage}
        className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      >
        Send
      </button>

      {messages
        .map((item, index) => {
          return (
            <label key={index} className="checkbox-container">
              {item.name}
              <input
                className="custom-checkbox"
                onChange={() => testFunc(item.value, index)}
                checked={item.value}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
          );
        })
        .sort((a, b) => a.index - b.index)}
    </div>
  );
}
