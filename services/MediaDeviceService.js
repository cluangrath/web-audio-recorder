class MediaDeviceService {
  constructor() {
    
  }
  async getAudioDevices() {
    console.log("getting devices");
    let devices = await navigator.mediaDevices.enumerateDevices();

    let audioDevices = devices
      .filter(device => {
        return device.kind === 'audioinput';
      })
      .map(device => {
        return {
          deviceId: device.deviceId,
          label: device.label ? device.label : `Unknown device`,
        };
      });

    return audioDevices;
  }
  async getAudioStream(deviceId) {
    let constraints = {
      audio: {
        deviceId: deviceId,
      },
    };
  
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  }
  async requestPermissions() {
    await navigator.mediaDevices.enumerateDevices();
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    return true;
  }
}

export default MediaDeviceService;