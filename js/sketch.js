let initTone = true;
let gravel

// Set up Tone

const reverb = new Tone.JCReverb(0.4).toDestination();
let gain = new Tone.Gain().connect(reverb);
let pan = new Tone.Panner().connect(gain);
let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.0,
  decay: 0.5,
  sustain: 0.1,
  release: 0.2
}).connect(reverb);



let noiseFilter = new Tone.Filter(1250, "highpass").connect(noiseEnv);
noise.connect(noiseFilter)

function preload() {
    gravel = loadImage("assets/gravel.png");
}

function setup() {
  createCanvas(400, 400);
  slider = new Nexus.Slider("#slider");
  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 
}

function draw() {
  background(220);
  image(gravel,200,200)

  text('minecraft gravel block', 100, 100);

}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  noiseEnv.triggerAttackRelease(0.2);
  

}