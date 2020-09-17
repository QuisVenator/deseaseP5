let personas = [];
let x = 700, y = 700;
let velocity = 8, contactR = 3;
let velocitySliderSane, velocitySliderSaneResp, velocitySliderSick,  velocitySliderSickResp,
  contactDistSlider, enfermosSlider, sanosSlider, deadlySlider, responsableSlider, maskSlider, cureTimeSlider, infectiousSlider;
let nuevaSimulacionButton, pauseButton;
let stoped = true;
let inicialized = false;

function setup() {
  createCanvas(x, y);

  nuevaSimulacionButton = createButton("Nueva simulación").mousePressed(reiniciar);
  pauseButton = createButton("Play").mousePressed(() => {
    if(inicialized) {
      stoped = !stoped;
      pauseButton.html(stoped ? "Play" : "Pause");
    } else {
      reiniciar();
      pauseButton.html(stoped ? "Play" : "Pause");
    }
  });
  createDiv('<h2>Config</h2>');
  createP("Personas inicialmente enfermas:");
  enfermosSlider = createSlider(1, 500, 2, 10);
  createP("Personas inicialmente sanas:");
  sanosSlider = createSlider(1, 500, 200, 10);
  createP("Distancia para posible infección:");
  contactDistSlider = createSlider(1, 20, 3, 0);
  createP("Probabilidad de morir:");
  deadlySlider = createSlider(0, 1, 0.2, 0);
  createP("Probabilidad de que una persona sea responsable:");
  responsableSlider = createSlider(1, 100, 20, 0);  
  createP("Eficiencia de máscaras:");
  maskSlider = createSlider(0, 1, 0.5, 0);
  createP("Probabilidad de infección (no considerando máscaras):");
  infectiousSlider = createSlider(0, 1, 0.9, 0);
  createP("Tiempo de recuperación:");
  cureTimeSlider = createSlider(0, 800, 200, 0);
  createDiv('<h3>Personas responsable</h3>');
  createP("Velocidad sano:");
  velocitySliderSaneResp = createSlider(0, 6, 2, 0);
  createP("Velocidad enfermo:");
  velocitySliderSickResp = createSlider(0, 6, 2, 0);
  createDiv('<h3>Personas irresponsables</h3>');
  createP("Velocidad sano:");
  velocitySliderSane = createSlider(0, 6, 2, 0);
  createP("Velocidad enfermo:");
  velocitySliderSick = createSlider(0, 6, 2, 0);
  
}

function reiniciar() {
  inicialized = true;
  personas = [];
  for(let i = 0; i < sanosSlider.value(); i++) personas.push(new Person(false, x, y));
  for(let i = 0; i < enfermosSlider.value(); i++) personas.push(new Person(true, x, y));
  stoped = false;
}

function draw() {
  if(stoped) return;
  strokeWeight(5);
  personas.forEach(x => x.move());
  personas.forEach(x => {
    personas.forEach(x2 => x.contagiar(x2));
  });
  background(220);
  personas.forEach(x => x.draw());
  personas.forEach(x => x.contagioAnim());
}