import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './speech.module.css'; // Importing CSS Module

function Report() {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    resetTranscript();  // Ensure resetTranscript is invoked as a function
  };

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
      </div>
    </div>
  );
}

export default Report;
