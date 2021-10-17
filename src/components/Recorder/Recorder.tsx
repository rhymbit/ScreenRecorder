import { desktopCapturer, remote } from 'electron';
import React, { FC, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFile } = require('fs');


const { dialog, Menu } = remote;

let mediaRecorder: MediaRecorder;
const recordedChunks: any[] = [];

// get all the recording display elements after they've been loaded in the DOM

let videoElement: any;
let startBtn: HTMLElement;
let stopBtn: HTMLElement;
let videoSelectBtn: HTMLElement;
// let videoDeleteBtn: HTMLElement;

const Recorder: FC = () => {

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      videoElement = document.getElementById(`video`);

      startBtn = document.getElementById(`startBtn`);
      startBtn.onclick = e => {
        mediaRecorder.start();
        startBtn.classList.remove("bg-green-600");
        startBtn.classList.remove("hover:bg-green-500");
        startBtn.classList.add("bg-red-500");
        startBtn.classList.add("animate-pulse");
        startBtn.innerText = 'Recording';
      }

      stopBtn = document.getElementById(`stopBtn`);
      stopBtn.onclick = e => {
        mediaRecorder.stop();
        startBtn.classList.remove("bg-red-500");
        startBtn.classList.remove("animate-pulse");
        startBtn.classList.add("bg-green-600");
        startBtn.classList.add("hover:bg-green-500");
        startBtn.innerText = 'Start';
      }

      videoSelectBtn = document.getElementById(`videoSelectBtn`);
      videoSelectBtn.onclick = getVideoSources;

    }, 200);
  }, [])


  return (
    <div>
    </div>
  )
}

async function getVideoSources() {
  
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });


  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source)
      };
    })
  );
  
  videoOptionsMenu.popup();

}

async function selectSource(source: Electron.DesktopCapturerSource) {
  
  videoSelectBtn.innerText = source.name;

  // stupid chromium
  const mediaDevices = navigator.mediaDevices as any;

  // create a stream
  const stream = await mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      }
    }
  });

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play()

  // Create the media recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register event handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handelStop;
}

function handleDataAvailable(e: any) {
  recordedChunks.push(e.data);
}

async function handelStop(e: any) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save Video',
    defaultPath: `vid-${Date.now()}.webm`
  });

  if (filePath) {
    writeFile(filePath, buffer, () => console.log('video saved successfully'));
  }

}

export default Recorder