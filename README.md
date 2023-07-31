# Learn English and Spanish with AI (and a Bitcoin bias!)

## Table of Contents  
### [Part 0 of 2 - Our final video pitch!](#part-0-of-2---our-final-video-pitch)
### [Part 1 of 2 - English Book for Latino Students](#part-1-of-2---english-book-for-latino-students)  
### [Part 2 of 2 - Spanish Website for English Speakers](#part-2-of-2---spanish-website-for-english-speakers)  

<br>
🤖🌋⚡🤖🌋⚡🤖🌋⚡

# Part 0 of 2 - [Our final video pitch!](https://www.loom.com/share/706a721b427848a8901773d3245ce556?sid=2cbc16b8-ac4c-4353-a259-dfe416fe1328)

<br>
🤖🌋⚡🤖🌋⚡🤖🌋⚡

# Part 1 of 2 - English Book for Latino Students

This is the first and main part of our team's hackathon submission - a complete textbook teaching English to Spanish speakers, but using ChatGPT to create English lessons with orange-pilling content. Why? Why not do both at the same time? 

Our team comes from the small mountain town of Berlin in El Salvador. Originally this project was started a week before the hackathon was announced simply to try to create lesson plans for an initiative to have locals that recently graduated from the Mi Primer Bitcoin course teach Spanish online to Bitcoiners, as an effort to gets some sats entering the economy - [if you're looking for Spanish lessons click here!](https://bitcoinspanish.my.canva.site/). However, because the level of English in this town is low, there is also a need for some of the potential tutors to improve their English. So we're experimenting with both English and Spanish content.

The team was initially more excited to create a textbook to teach English to El Salvadorians for 1 main reason: 
It is still a more comfortable format that all ages of Salvadorians are used to. This was proven by the success of the Mi Primer Bitcoin textbook. However, as we all know learning something as complex as money and Bitcoin takes numerous approaches. We think that teaching Bitcoin from a primary angle of teaching English could be an approach that works for some students.

## 📖 The Textbook
[The initial version of the textbook is here!](https://drive.google.com/file/d/1iC2yy2pCsye1DKHkfciVHwF-zv2eJLlC/view) We have 5 chapters with 35 pages completed, with text created by ChatGPT and images created by Midjourney.

Please review the PDF linked above, but here are also a few screenshots. As you can see the lessons are a mix of teaching English and money and Bitcoin:

<img width="638" alt="Screenshot 2023-07-31 at 5 36 33 AM" src="https://github.com/salvatoto/berlin-spanish-ai/assets/96950641/da8d78ec-a684-418c-97bd-9235f41f19a0">

<img width="637" alt="Screenshot 2023-07-31 at 5 36 43 AM" src="https://github.com/salvatoto/berlin-spanish-ai/assets/96950641/723bb1d5-e775-4cd6-8c61-97357c3eae3b">

<img width="643" alt="Screenshot 2023-07-31 at 5 37 38 AM" src="https://github.com/salvatoto/berlin-spanish-ai/assets/96950641/ca1d188e-34cf-4b5b-a15d-a4f446b4c78d">


## 🤖 Prompts Used

Here is a sample of the prompts used:

> Remember, you are a Bitcoin maximalist and believe fully in the decentralization of Bitcoin over the centralization of flat money. The price of Bitcoin matters to you, but not as much as the decentralization of Bitcoin. You also think CBDCs will allow governments extreme levels of totalitarian control. Also, you are a very dynamic language teacher that is VERY passionate about the content provided. You are creating the basic/beginner section of a book that teaches english to spanish speakers. The content should contain progressive dialogues between the teacher and a student learning about money, and why a decentralized, scarce money is better than a centralized infinitely  printable money. Can you give me a detailed outline of what the 5 chapters would be and their contents?

> Make a list of verbs used in this text and include its translation to spanish:

> Create a test for chapter ¨4:  The Concerns with Centralized Digital Currency (CBDCs)¨ and include a fill in the blanks exercise```  

> Write a Short story about ¨The concept of inflation and its effects on economy¨```  

<br><br>

🤖🌋⚡🤖🌋⚡🤖🌋⚡🤖🌋⚡
# Part 2 of 2 - Spanish Website for English Speakers

The majority of to code in this repo the second part of our team's hackathon submission. This second part is taking the same idea but wrapping it in a pre-prompted web page, and experimenting with Spanish for English speakers. 

[A working version of the app is here!](https://berlin-spanish-ai.vercel.app/)

## ✨ A screenshot of the app:

<img width="1179" alt="Screenshot 2023-07-31 at 7 06 56 AM" src="https://github.com/salvatoto/berlin-spanish-ai/assets/96950641/cab7d338-ba06-4e53-b88f-5a809899c33f">


## 🤖 The current version of the prompt is:
```  
const baseMessages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `You're a Bitcoin maximalist, valuing its decentralization over fiat. You fear CBDCs will lead to totalitarian control. 
      Also, you're a passionate and dynamic language teacher.`,
    },
    {
      role: 'user',
      content: `You're a Bitcoin believer and a passionate Spanish teacher. Create an Spanish lesson about ${lesson_subject}, 
      emphasizing Bitcoin's decentralization. The lesson should be styled as a ${lesson_style}, with instructions in English but content in Spanish,
      and limited to about 100 words. Format for a HTML <p> tag with line breaks.`,
    },
  ]
```

And the current array of pre-defined `subjects` and `styles` is (the styles were suggested by ChatGPT in the course of working on the book):
```
const lessonSubjects = ["The Verb Poder", "Present Tense Verbs", "Este, esta, esto", "Definite articles", "Masculine and Femenine Articles", "El Preterito", "El Subjuntivo", "Estar", "Ser", "Por vs Para", "Reflexive Verbs"];
    const lessonStyles = ["Chiste (Joke)", "Cuento Corto (Short Story)", "Ejemplo Absurdo (Absurd Example)", "Canción (Song)", "True or False", "Multiple Choice", "Fill in the Blank", "Traducción (Translate the Sentence)", "Corrección de Errores (Error Correction)"];
```

<br><br>

## Made for the Bolt.fun #Ai4ALL Bitcoin and AI hackathon

https://bolt.fun/tournaments/ai4all
