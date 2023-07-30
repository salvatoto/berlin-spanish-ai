import React, { useState, ChangeEvent, FormEvent } from 'react';
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './ChatLine'

export function LessonForm() {
    const [subject, setSubject] = useState("");
    const [style, setStyle] = useState("");
    const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
  
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lesson_subject: subject, lesson_style: style }),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      let lastMessage = "";
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
  
        lastMessage = lastMessage + chunkValue;
  
        setMessages([
          { role: "assistant", content: lastMessage } as ChatGPTMessage,
        ]);
        console.log("lastMessage: ", lastMessage);
  
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Lesson Subject:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label>
          Lesson Style:
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
        {loading && <div>Loading...</div>}
        {messages.map((message, i) => (
          <p key={i}>{message.content}</p>
        ))}
      </form>
    );
  }
  