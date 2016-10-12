var bpm = 95; 
var beat = 160 / bpm;
var loopMs = beat * 1000 * 4;


////////////////////////////// 
//// VISUALIZERS:
//// BASS:
// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
//var audioSourcer = function(e) {}
//audio.src = 'assets/snare.wav'
var visualizerAudioSrc = "assets/amber-bass-stem.mp3";
//var visualizerAudioSrc = bass.play(); doesn't work...
audio.src = visualizerAudioSrc;
audio.controls = false;
audio.loop = false;
audio.autoplay = false;
// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('bass_audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('bass_analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
//	analyser.connect(context.destination); // mutes what is being analysed!
	frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#697368'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 1;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}
/////////////////////




//// create "instruments" for each track
var lVox = new Wad({
    source : 'assets/amber-lvox-stem.mp3',
    env : {decay : 10000}});
var bVox = new Wad({
    source : 'assets/amber-bvox-stem.mp3',
    env : {decay : 10000}});
var guitar1 = new Wad({
    source : 'assets/amber-guitarl-stem.mp3',
    env : {decay : 10000}});
var guitar2 = new Wad({
    source : 'assets/amber-guitarr-stem.mp3',
    env : {decay : 10000}});
var piano = new Wad({
    source : 'assets/amber-piano-stem.mp3',
    env : {decay : 10000}});
var oohaah = new Wad({
    source : 'assets/amber-oohaah-stem.mp3',
    env : {decay : 10000}});
var bass = new Wad({
    source : 'assets/amber-bass-stem.mp3',
    env : {decay : 10000}});
var kit = new Wad({
    source : 'assets/amber-kit-stem.mp3',
    env : {decay : 10000}});

function launchClips() {
    lVox.play();
    bVox.play();
    guitar1.play();
    guitar2.play();
    piano.play();
    oohaah.play();
    bass.play();
    kit.play();
};

//$('#bass_volumeDown').click(function(){ 
////    bass.volume = bass.volume - 0.1;
//    bass.setVolume(0.5);
//    console.log('bass vol - clicked');
//});
//
//$('#bass_panningL').click(function(){
////    bass.volume = bass.volume - 0.1;
//    bass.setPanning(-1);
//    console.log('bass pan L clicked');
//});

$('.bass_knobs').click(function(e) {
    if (e.target.id === 'bass_panningL') {
        bass.setPanning(bass.panning.location - 0.1);
        console.log('bass pan L clicked');
    }
    else if (e.target.id === 'bass_panningR') {
        bass.setPanning(bass.panning.location + 0.1);
        console.log('bass pan R clicked');
    }
})

//// RESOURCES:
//// Knobs: http://tutorialzine.com/2011/11/pretty-switches-css3-jquery/
//// adjust knob dynamically: http://stackoverflow.com/questions/25887224/how-to-change-knob-value-dynamically-in-jquery

