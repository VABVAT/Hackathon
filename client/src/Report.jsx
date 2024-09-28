import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './speech.module.css'; // Importing CSS Module
import { useState } from 'react';

function Report() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [translatedtext, settranslatedtext] = useState(null); 
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    resetTranscript();  // Ensure resetTranscript is invoked as a function
  };

  const externalML = async () => {
    try{
      const response = await fetch("https://hackathon-five-jet.vercel.app/language", {
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body:{
          text: {transcript}
        }
      })
      if(response.status === 200){
        const data = await response.json()
        // res.status(200).json({text:data});
        settranslatedtext(data)
      }else{
        // res.status(401).json({error: "not able to translate"})
      }
    }catch(e){
        // res.status(405).json({error : "server is probably down"})
    }
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div>
        <p>Your browser does not support speech recognition.</p>
        <p>Please use an updated version of Chrome or Firefox for the best experience.</p>
      </div>
    );
  }

  return (
    <div className={styles.speech}>
      <div className={styles.speech__transcript}>
        {transcript || "Your text will appear here."}
      </div>
      <div id="container">
        <button className={styles.speech__button} onClick={startListening}>Start Listening</button>
        <button className={styles.speech__button} onClick={stopListening}>Stop Listening</button>
        <button className={styles.speech__button} onClick={reset}>Reset</button>
        <button className={styles.speech__button} onClick={externalML}>Get solution</button>
      </div>
      <div className='otpt'>
        <p>{translatedtext ? translatedtext : "translated text will appear here on clicking get solution"}</p>
      </div>
    </div>
  );
}

export default Report;
