import { Layout, Text, Page } from '@vercel/examples-ui'
// import { LessonForm } from '../components/LessonForm'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { type ChatGPTMessage } from '../components/ChatLine'

function Home() {
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // for now, choose random subject and style combination
    const lessonSubjects = ["The verb poder", "Present tense verbs", "Este, esta, esto", "Definite articles", "Masculine and Femenine Articles"];
    const lessonStyles = ["Chiste (Joke)", "Cuento Corto (Short Story)", "Ejemplo Absurdo (Absurd Example)","True of False", "Multiple Choice", "Fill in the Blank"];
  
    const chosenSubject = lessonSubjects[Math.floor(Math.random() * lessonSubjects.length)];
    const chosenStyle = lessonStyles[Math.floor(Math.random() * lessonStyles.length)];

    // Set the subject and style immediately after they're randomly chosen
    setSubject(chosenSubject);
    setStyle(chosenStyle);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lesson_subject: chosenSubject, lesson_style: chosenStyle }),
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
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div style={{display: "flex", justifyContent: "center"}}>

          <Text variant="h1">Learn Spanish with AI</Text>
          <Text className="text-zinc-600"></Text>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div style={{display: "flex", justifyContent: "center"}}>
          <button 
            style={{ 
              backgroundColor: "white", 
              borderColor: "black", 
              borderRadius: "12px", 
              borderWidth: "2px", 
              padding: "10px", 
              fontSize: "20px",
              fontWeight: "bold",
              width: "30%",
              cursor: "pointer" 
            }} 
            onClick={handleClick}>
              New Lesson
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
      <Text variant="h2" style={{color: "#808080"}}>Learn:<span style={{color: "black", paddingLeft: "14px"}}>{subject}</span></Text>
      <Text variant="h2" style={{color: "#808080"}}>Style:<span style={{color: "black", paddingLeft: "14px"}}>{style}</span></Text>
      </section>

      {messages.map((message, i) => (
        <p key={i}>{message.content}</p>
      ))}
      
    </Page>
  )
}

Home.Layout = Layout

export default Home
