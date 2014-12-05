// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require recorder

function __log(e, data) {
  console.log("\n" + e + " " + (data || ''));
}
var audio_context;
var recorder;
function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  __log('Media stream created.');
  // Uncomment if you want the audio to feedback directly
  //input.connect(audio_context.destination);
  //__log('Input connected to audio context destination.');

  recorder = new Recorder(input);
  __log('Recorder initialised.');
}
function startRecording(button) {
  recorder && recorder.record();
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  __log('Recording...');
}
function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  __log('Stopped recording.');

  // create WAV download link using audio data blob
  createDownloadLink();

  recorder.clear();
}
function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    Recorder.forceDownload(blob, 'register');
  });
}
window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });
};
