import { Layout, Text, Page } from '@vercel/examples-ui'
// import { LessonForm } from '../components/LessonForm'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { type ChatGPTMessage } from '../components/ChatLine'

function Home() {
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGoDeeper, setShowGoDeeper] = useState(false);
  const [requestOngoing, setRequestOngoing] = useState(false);

  const handleNewLessonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setShowGoDeeper(false);
    
    const lessonSubjects = ["The Verb Poder", "Present Tense Verbs", "Este, esta, esto", "Definite articles", "Masculine and Femenine Articles", "El Preterito", "El Subjuntivo", "Estar", "Ser", "Por vs Para", "Reflexive Verbs"];
    const lessonStyles = ["Chiste (Joke)", "Cuento Corto (Short Story)", "Ejemplo Absurdo (Absurd Example)", "Canción (Song)", "True or False", "Multiple Choice", "Fill in the Blank", "Traducción (Translate the Sentence)", "Corrección de Errores (Error Correction)"];
  
    const chosenSubject = lessonSubjects[Math.floor(Math.random() * lessonSubjects.length)];
    const chosenStyle = lessonStyles[Math.floor(Math.random() * lessonStyles.length)];
  
    setSubject(chosenSubject);
    setStyle(chosenStyle);  
    setRequestOngoing(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lesson_subject: chosenSubject, lesson_style: chosenStyle, messages, goDeeper: false }),
    });
  
    console.log("response of first call: ", response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
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

    setRequestOngoing(false);
    setShowGoDeeper(true);

    console.log("first call: ", lastMessage);
  };
  
  const handleGoDeeperClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setRequestOngoing(true);

    console.log("in go deeper");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lesson_subject: subject, lesson_style: style, messages, goDeeper: true }),
    });

    console.log("response of go deeper: ", response);

  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
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
        ...messages,
        { role: "assistant", content: lastMessage } as ChatGPTMessage,
      ]);
      console.log("lastMessage: ", lastMessage);

      setLoading(false);
    }

    setRequestOngoing(false);
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
            disabled={requestOngoing}
            onClick={handleNewLessonClick}>
              New Lesson
          </button>          
        </div>
      </section>

      <section className="flex flex-col gap-3">
      <Text variant="h2" style={{color: "#808080"}}>Learn:<span style={{color: "#3CB371", paddingLeft: "14px"}}>{subject}</span></Text>
      <Text variant="h2" style={{color: "#808080"}}>Style:<span style={{color: "#226640", paddingLeft: "14px"}}>{style}</span></Text>
      </section>

      {messages.map((message, i) => (
       <p key={i} dangerouslySetInnerHTML={{__html: message.content}} />
      ))}

      {showGoDeeper && 
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
              cursor: "pointer",
              marginTop: "20px" 
            }} 
            disabled={requestOngoing}
            onClick={(e) => handleGoDeeperClick(e)}>
              Go Deeper
          </button>
        </div>
      }

    <section className="flex flex-col gap-3" style={{justifyContent: "center", marginTop: "20px"}}>
      <a href="https://github.com/salvatoto/berlin-spanish-ai/" target="_blank" rel="noreferrer" style={{textAlign: "center"}}>
        View on GitHub
      </a>
    </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
