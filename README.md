# Learn Spanish with AI (and a Bitcoin bias!)

This is the second part of our team's hackathon submission. The first part is a complete textbook teaching English to Spanish speakers, but using ChatGPT to create English lessons with orange-pilling content. Why? Why not do both at the same time? 

This second part is taking the same idea but wrapping it in a pre-prompted web page, and is also Spanish for English speakers. Our team comes from the small mountain town of Berlin in El Salvador. Originally this project was started a week before the hackathon was announced simply to try to create a lesson plans for an initiative to have the locals teach Spanish online and in person to Bitcoiners, as an effort to gets some sats entering the economy - [if you're looking for Spanish lessons click here!](https://bitcoinspanish.my.canva.site/). However, because the level of English in this town is low, there is also a need for some of the potential tutors to improve their English. So we're experimenting with both English and Spanish content.


The current version of the prompt is:
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


## Made for the Bolt.fun #Ai4ALL Bitcoin and AI hackathon

https://bolt.fun/tournaments/ai4all
