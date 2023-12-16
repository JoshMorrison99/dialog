'use client'

import 'regenerator-runtime/runtime'
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Stack, Typography } from '@mui/material';
import './globals.css';


export default function Home() {
  const { listening, resetTranscript, finalTranscript } = useSpeechRecognition();
  const [isTalking, setTalking] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: 'fr-FR' });
    }

    setTalking(!isTalking);
  };

  const handleEnd = () => {
    if (finalTranscript.trim() !== '') {
      setMessages([...messages, finalTranscript]);
    }
    resetTranscript(); // Clear the transcript after processing
  };

  return (
    <div style={{ background: '#282828', minHeight: '100vh', padding: 0, margin: 0 }}>
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%' }}>
        <Stack spacing={1} direction="column" alignItems="stretch">
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '8px', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
              <Typography variant='p' color='#fffff2'>{msg}</Typography>
            </div>
          ))}
        </Stack>
      </div>

      <Button
        variant="contained"
        color={listening ? 'secondary' : 'primary'}
        style={{
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        <MicIcon />
      </Button>

      {/* Set the onEnd callback to handle the completion of speech recognition */}
      {finalTranscript && <div style={{ display: 'none' }}>{handleEnd()}</div>}
    </div>
  );
}
