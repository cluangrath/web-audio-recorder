<template>
  <div>
    <div>
      <select v-model="selectedAudioDevice">
        <option>Please select an audio device...</option>
        <option v-for="mediaDevice in mediaDevices" v-bind:value="mediaDevice.deviceId" v-bind:key="mediaDevice.deviceId">
          {{ mediaDevice.label }}
        </option>
      </select>
    </div>
    <button @click="startRecording" v-if="!isRecording">Start recording</button>
    <button @click="stopRecording" v-if="isRecording">Stop recording</button>
  </div>
</template>

<script>
import MediaDeviceService from './services/MediaDeviceService';
import RecordingService from './services/RecordingService';

export default {
  data() {
    return {
      isRecording: false,
      mediaDevices: [],
      mediaDeviceService: null,
      recordingService: null,
      selectedAudioDevice: null
    };
  },
  methods: {
    startRecording() {
      this.isRecording = true;
      this.recordingService.start(this.selectedAudioDevice);
    },
    stopRecording() {
      this.isRecording = false;
      this.recordingService.stop();
    },
  },
  async mounted() {
    this.mediaDeviceService = new MediaDeviceService();
    this.recordingService = new RecordingService();

    await this.mediaDeviceService.requestPermissions();

    this.mediaDevices = await this.mediaDeviceService.getAudioDevices();
  }
};
</script>