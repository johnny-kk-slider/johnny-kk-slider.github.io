// Set the duration of the timer (in seconds)
let duration = 93;
let idCount = 0;
let baseBro = {
  name: "",
  id: idCount,
  option1: 0,
  option2: 0,
  option3: 0,
  option4: 0,
  option5: 0,
  total: 0
};
let currentBro = {
    name: "",
    id: idCount,
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0,
    option5: 0,
    total: 0
  };
  let xValues = ["Vibing", "Horny", "Hungry", "Need a Drink", "Existential Dread"];
  let yValues = [];
  let barColors = ["red", "green","blue","orange","purple", "pink"];
let bros = [];
let darkMode = false;
// Get the timer element from the DOM
const timer = document.getElementById('timer');

// Define a function to update the timer
function updateTimer() {
  // Calculate the minutes and seconds remaining
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  // Display the remaining time in the timer element
  timer.textContent = `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Decrement the duration
  duration--;

  // Stop the timer if we've reached zero
  if (duration < 0) {
    duration = 93;
  }
}

// Call the updateTimer function every second
const intervalId = setInterval(updateTimer, 1000);

function toggleDark() {
    var element = document.body;
   element.classList.toggle("dark-mode");  
  if(darkMode == false){
    darkMode = true;
  } else{
    darkMode = false;
  }
}



function responseReceived(option) {
    if(currentBro.name != ""){
  switch (option) {
    case 'option1':
        currentBro.option1++;
        currentBro.total++;
      break;
    case 'option2':
        currentBro.option2++;
        currentBro.total++;
      break;
    case 'option3':
        currentBro.option3++;
        currentBro.total++;
      break;
    case 'option4':
        currentBro.option4++;
        currentBro.total++;
      break;
    case 'option5':
        currentBro.option5++;
        currentBro.total++;
      break;
    default:
      break;
  }

  bros[currentBro.id] = currentBro;
  console.log(currentBro);
  updateDashboard();
    }
}

function updateDashboard(){
    let brosCanvas = document.getElementById('brosCanvas');
    brosCanvas.innerHTML = ''; // clear all options
    for (let i = 0; i < bros.length; i++) {
        canvas = document.createElement('canvas');
        canvas.id = bros[i].name + "canvas";
        brosCanvas.appendChild(canvas);
    }
    for (let i = 0; i < bros.length; i++) {
        chart = document.getElementById(bros[i].name + "canvas");
        yValues = [bros[i].option1, bros[i].option2, bros[i].option3, bros[i].option4, bros[i].option5];
        new Chart(chart, {
            type: "bar",
            data: {
              labels: xValues,
              datasets: [{
                backgroundColor: barColors,
                data: yValues
              }]
            },
            options: {
              legend: {display: false},
              title: {
                display: true,
                text: bros[i].name + " Current Mood. Bro received " + bros[i].total + " white claw"
              }
            }
          });
    }
}


function addNewBro() {
    // Get the value of the name input element
    let name = document.getElementById('name-input').value;
    if(name != ""){
    // Create a new baseBro object with the name and default counts
    let newBaseBro = {
      name: name,
      id: idCount,
      option1: 0,
      option2: 0,
      option3: 0,
      option4: 0,
      option5: 0,
      total: 0
    };
  
    // Add the new baseBro to the array
    bros.push(newBaseBro);
    //update idCount
    idCount++;
    currentBro = newBaseBro;
    updateBrosSelect();
    // Log the updated array to the console
    console.log(bros);
    }
   
  }

  function updateBrosSelect() {
    let baseBroSelect = document.getElementById('baseBro-select');
    baseBroSelect.innerHTML = ''; // clear all options
    let option = document.createElement('option');
    option.textContent = "Select a new Bro";
    baseBroSelect.appendChild(option);
    for (let i = 0; i < bros.length; i++) {
      option = document.createElement('option');
      option.value = i;
      option.textContent = bros[i].name;
      baseBroSelect.appendChild(option);
    }
    document.getElementById('curActive').innerHTML = currentBro.name;
  }
  
  function selectCurrentBro(){
    let selectedBro = document.getElementById('baseBro-select').value;
    bros[currentBro.id] = currentBro;
    currentBro = bros[selectedBro];
    console.log(bros);
    updateBrosSelect();
  }
