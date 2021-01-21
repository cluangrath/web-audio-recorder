import MediaDeviceService from "./MediaDeviceService";

class RecordingService {
  constructor() {
    this.chunks = [];
    this.mediaRecorder = null;
    this.mediaDeviceService = new MediaDeviceService();
  }
  async start(audioDeviceId) {
    console.log("starting");
    let audioStream = await this.mediaDeviceService.getAudioStream(audioDeviceId);
    this.mediaRecorder = new MediaRecorder(audioStream);
    this.mediaRecorder.addEventListener('dataavailable', e => {
      this.chunks.push(e.data);

      var blob = new Blob(this.chunks, {
        type: "audio/webm"
      });
  
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
  
      a.style = "display: none";
      a.href = url;
      a.download = "test.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    });

    this.mediaRecorder.start();
  }
  stop() {
    console.log("stopping");
    this.mediaRecorder.stop();
  }
}

export default RecordingService;