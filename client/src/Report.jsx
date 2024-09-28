import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './speech.module.css'; // Importing CSS Module
import { useState } from 'react';

function Report() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [translatedtext, settranslatedtext] = useState(null); 
  const [sol, setsol] = useState(null);
  const [pol, setpol] = useState(null);
  const startListening = () => {
    resetTranscript();
    settranslatedtext(null);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    settranslatedtext(null);
    resetTranscript();  // Ensure resetTranscript is invoked as a function
  };

  const externalML = async () => {
    try{
      const response = await fetch("https://hackathon-five-jet.vercel.app/language", {
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          text: transcript
        })
      })
      // console.log(response);
      if(response.status === 200){
        const data = await response.json()
        console.log(data);
        settranslatedtext(data.translatedText)
      }else{

      }
    }catch(e){
    }
  }

  const getSOl = async() => {
    try{
        const response = await fetch("https://a425-103-210-49-131.ngrok-free.app", {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            case_description:translatedtext
          })
        });
        // console.log(response)
        if(response.ok){
          const data = await response.json();
          setsol(data.case_type);
          setpol(data.procedure)
          console.log(data.case_type);
        }
    }catch(e){

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
    <>
    <div className={styles.speech}>
      <div className={styles.speech__transcript}>
        {transcript || "Your text will appear here."}
      </div>
      <div id="container">
        <button className={styles.speech__button} onClick={startListening}>Start Listening</button>
        <button className={styles.speech__button} onClick={stopListening}>Stop Listening</button>
        <button className={styles.speech__button} onClick={reset}>Reset</button>
        <button className={styles.speech__button} onClick={externalML}>translate you text</button>
        <button  className={styles.speech__button} onClick={getSOl}>Get solution for problem</button>

      </div>
    </div>
    <div className={styles.otpt}>
        <p>{translatedtext ? translatedtext : ""}</p>
      </div>
    <div className={styles.solution}>
      <div className={styles.first}>
        CASE TYPE
        <br></br>
        <p>{sol ? sol : ""}</p>
      </div>
      <div className={styles.first}>
        PROCEDURE TO BE FOLLOWED
        <br></br>
        <p>{pol ? pol : ""}</p>
      </div>
    </div>
    </>
  );
}

export default Report;
