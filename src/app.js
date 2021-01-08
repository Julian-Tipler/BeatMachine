

window.addEventListener('DOMContentLoaded', () => {

//samples column
(() => {
    let drumMachineLeftColumn = document.body.querySelector('.drum-machine-left-column');
    let names = ['kick']
    for (let i = 0; i <1; i++) {
        let sampleName = document.createElement('select');
        sampleName.className = `samples-column-sampleName`;

        let option1 = document.createElement('option');
        option1.innerHTML = names[i];

        sampleName.appendChild(option1);
        drumMachineLeftColumn.appendChild(sampleName)
    }
})()

//generateOneRow
const generateRows = (rowNum) => {
    let drumMachineButtons = document.body.querySelector('.drum-machine-buttons')
    for (let i = 0; i < rowNum; i++) {
        let row = document.createElement('div')
        row.className=`full-row-${i}`
        for (let j = 0; j < 16; j++) {
            let button = document.createElement('input');
            button.classList.add(`row-${i}`, `col-${j}`,`drum-machine-button`)
            button.type = 'checkbox'
            row.appendChild(button)
        }
        drumMachineButtons.appendChild(row)
    }

    //testing
    let zeroAndEight = document.querySelectorAll('.row-0.col-0,.row-0.col-8')
    zeroAndEight.forEach(el=> {
        el.checked=true
    })
    let fourAndTwelve = document.querySelectorAll('.row-1.col-4,.row-1.col-12')
        fourAndTwelve.forEach(el=> {
        el.checked=true
    })
    //testing
    
}
generateRows(8);


function sequencer(){
    document.documentElement.addEventListener("mousedown", () => {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
    })
    //effects
    const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination()
    const bitCrusher = new Tone.BitCrusher(1).connect(delay)
//automation
    //delay
    delay.set({wet:0})
    document.querySelector('.delay-wetness').addEventListener('input', (e) => {
        e.preventDefault
        delay.set({
            wet: e.currentTarget.value/100
        })
    })
    //bitcrusher
    bitCrusher.set({wet:0})
    document.querySelector('.bitcrush-wetness').addEventListener('input', (e) => {
        e.preventDefault
        bitCrusher.set({
            wet: e.currentTarget.value/100
        })
    })
    //samples
    const kick = new Tone.Player('../assets/Thumpy.wav').connect(bitCrusher);
    const snare = new Tone.Player('../assets/good-disco-snare_2.wav').connect(bitCrusher);
    

    
    let index=0;
    let playing = false

    Tone.Transport.scheduleRepeat(repeat,'8n')
     

    function repeat() {
        let step = index % 16;

        let kickInputs = document.querySelector(`.full-row-0 input:nth-child(${step + 1})`)
        if(kickInputs.checked){
            kick.start()
        }
        
        let snareInputs = document.querySelector(`.full-row-1 input:nth-child(${step + 1})`)
        if(snareInputs.checked){
            snare.start()
        }
        index++
    }

    const playPauseTrack = ()=> {
        if (playing === false) {
            Tone.Transport.start()
            playing = true
        } else {
            Tone.Transport.pause()
            playing = false
        }
        
    }

    const stopTrack = ()=> {
        Tone.Transport.stop()
        playing = false
        index = 0
    }


    const playButton = document.querySelector('.play-pause-button')
    playButton.addEventListener('click', ()=> playPauseTrack());

    const stopButton = document.querySelector('.stop-button')
    stopButton.addEventListener('click', ()=> stopTrack());

    document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        playPauseTrack() 
    }
    } 
}

sequencer();



//do a for loop that generates 8 rows of buttons

// var synth = new Tone.Synth()
// synth.oscillator.type = 'sawtooth';
// synth.toMaster();

// Tone.Transport.scheduleRepeat(repeat, '8n');


// const rows = document.body.querySelector('drum-maching-buttons')
// console.log(rows)
// function repeat(time) {
//     for (let i=0; i < rows.clientHeight; i++) {
//         row = rows[i]
//     }
// }



})

// window.addEventListener('DOMContentLoaded', () => {

//     document.documentElement.addEventListener("mousedown", () => {
//         if (Tone.context.state !== 'running') {
//             Tone.context.resume();
//         }
//     })

//     //makes an array of the mp3s
//     const soundKitA = [];
//     (function generateSoundKitA() {
//         for (let i = 1; i <= 8; i++) {
//             let sound = new Tone.Player(`./dist/sample_0${i}.wav`).toDestination();
//             soundKitA.push(sound);
//         }
//     })();

//     const soundKitAButtonDescriptions = ['Kick', 'Snare', 'Tom', 'Hat', 'Snap', 'Keys 1', 'Keys 2', 'Keys 3'];
//     (function generateSampleButtons() {
//         let sequencerSamplesColumn = document.body.querySelector('.sequencer-samples-column');
//         for (let i = 0; i < 15; i++) {
//             let button = document.createElement('button');
//             button.className = `samples-column-button`;
//             if (i > 7) button.classList.add('hidden');

//             let icon = document.createElement('i');
//             icon.className = 'fas fa-music';

//             let span = document.createElement('span');
//             span.innerHTML = soundKitAButtonDescriptions[i];

//             button.appendChild(icon);
//             button.appendChild(span);
//             sequencerSamplesColumn.appendChild(button)
//         }
//     })();

//     const sampleButtons = Array.from(document.body.querySelectorAll('.samples-column-button'));
//     let currentSoundKit = 'A';
//     (function generateSampleButtonEventListeners() {
//         sampleButtons.forEach((button, i) => {
//             button.addEventListener('mousedown', () => {
//                 if (currentSoundKit === 'A') {
//                     soundKitA[i].start();
//                 } else {
//                     soundKitB[i].triggerAttackRelease(pitches[i], '16n');
//                 }
//             })
//         })
//     })();

//     (function generateToggleSoundKitButtons() {
//         let sequencerSamplesColumn = document.body.querySelector('.sequencer-samples-column');

//         let div = document.createElement('div');
//         div.className = 'toggle-sound-kit';

//         let buttonOne = document.createElement('button');
//         buttonOne.className = 'sound-kit-a-toggle active';
//         buttonOne.innerHTML = 'A';

//         let buttonTwo = document.createElement('button');
//         buttonTwo.className = 'sound-kit-b-toggle';
//         buttonTwo.innerHTML = 'B';

//         div.appendChild(buttonOne);
//         div.appendChild(buttonTwo);
//         sequencerSamplesColumn.appendChild(div)
//     })();

//     (function generateRows() {
//         let sequencerRows = document.body.querySelector('.sequencer-rows');
//         for (let i = 0; i < 15; i++) {
//             let row = document.createElement('div');
//             row.classList.add('sequencer-row');
//             if (i > 7) row.classList.add('hidden');
            
//             for (let j = 0; j < 32; j++) {
//                 let label = document.createElement('label');

//                 let input = document.createElement('input');
//                 input.type = 'checkbox';
//                 input.classList.add(`sequencer-row-checkbox`,`row-${i}`,`col-${j}`);

//                 let span = document.createElement('span');
//                 span.classList.add('sequencer-row-pad');

//                 label.appendChild(input);
//                 label.appendChild(span);
//                 row.appendChild(label);
//             }

//             sequencerRows.appendChild(row)
//         }
//     })();

//     const rows = Array.from(document.body.querySelectorAll('.sequencer-row'));
//     const allPads = Array.from(document.body.querySelectorAll('.sequencer-row-checkbox'));
//     let columnCounter = 0;

//     (function generateBeatCounterDisplay() {
//         let sequencerBeatCountDisplay = document.body.querySelector('.sequencer-beat-count-display');
//         for (let i = 1; i <= 32; i++) {
//             let div = document.createElement('div');
//             div.className = 'beat-count-number';
//             div.innerHTML = `${i}`;
//             sequencerBeatCountDisplay.appendChild(div)
//         }
//     })();

//     // Buttons & Button Logic

//     const playButton = document.body.querySelector('.fa-play-circle');
//     playButton.addEventListener('click', () => play());
    
//     const stopButton = document.body.querySelector('.fa-stop-circle');
//     stopButton.addEventListener('click', () => stop());

//     function play() {
//         columnCounter = 0;
//         Tone.Transport.start();
//         playButton.classList.add('hidden');
//         stopButton.classList.remove('hidden');
//     }

//     function stop() {
//         Tone.Transport.stop();
//         playButton.classList.remove('hidden');
//         stopButton.classList.add('hidden');
//         setTimeout(() => {
//             allPads.forEach(checkbox => { checkbox.classList.remove('active') })
//         }, 100);
//     }

//     const clearButton = document.body.querySelector('.clear-button');
//     clearButton.addEventListener('click', () => clear());
        
//     function clear() {
//         if (playButton.classList.contains('hidden')) {
//             stop();
//         }

//         setTimeout(() => {
//             allPads.forEach(checkbox => { checkbox.checked = false; })
//         }, 125);
//     }

//     const bpmInput = document.body.querySelector('.bpm-input');
//     const bpmOutput = document.body.querySelector('.form-output');

//     bpmInput.addEventListener('change', (e) => {
//         e.preventDefault();
//         updateBPM(e.currentTarget.value);
//     })

//     function updateBPM(val) {
//         bpmInput.value = val;
//         bpmOutput.innerHTML = val;
//         Tone.Transport.bpm.value = val; 
//     }

//     const soundKitAButton = document.body.querySelector('.sound-kit-a-toggle');
//     soundKitAButton.addEventListener('click', () => enableSoundKitA());

//     const soundKitBButton = document.body.querySelector('.sound-kit-b-toggle');
//     soundKitBButton.addEventListener('click', () => enableSoundKitB());

//     function enableSoundKitA() {
//         if (!soundKitAButton.classList.contains('active')) {
//             currentSoundKit = 'A';
//             soundKitAButton.classList.add('active');
//             soundKitBButton.classList.remove('active');
//             updateSampleButtonDescriptions(soundKitAButtonDescriptions);

//             for (let i = 8; i < 15; i++) {
//                 sampleButtons[i].classList.add('hidden');
//                 rows[i].classList.add('hidden');
//             }
//         }
//     }

//     function enableSoundKitB() {
//         if (!soundKitBButton.classList.contains('active')) {
//             currentSoundKit = 'B';
//             soundKitBButton.classList.add('active');
//             soundKitAButton.classList.remove('active');
//             updateSampleButtonDescriptions(soundKitBButtonDescriptions);

//             for (let i = 8; i < 15; i++) {
//                 sampleButtons[i].classList.remove('hidden');
//                 rows[i].classList.remove('hidden');
//             }
//         }
//     }

//     function updateSampleButtonDescriptions(descriptions) {
//         sampleButtons.forEach((button, i) => {
//             button.children[1].innerHTML = descriptions[i];
//         })
//     }

//     const presetsDropdownButton = document.body.querySelector('.fa-caret-square-down');
//     const dropdownMenu = document.body.querySelector('.dropdown-menu');
//     let dropdownOpen = false;
//     presetsDropdownButton.addEventListener('click', () => toggleDropdown());
    
//     function toggleDropdown() {
//         dropdownOpen = !dropdownOpen;
//         if (dropdownOpen) {
//             dropdownMenu.classList.remove('hidden');
//         } else {
//             dropdownMenu.classList.add('hidden')
//         }
//     }
    
//     const body = document.body.querySelector('.body');
//     body.addEventListener('click', (e) => {
//         if (dropdownOpen && !presetsDropdownButton.contains(e.target)) {
//            toggleDropdown();
//         }
//     })

//     const presetA1 = document.body.querySelector('.preset-a1');
//     presetA1.addEventListener('click', () => initializePreset('A', 120, a1));
    
//     const presetA2 = document.body.querySelector('.preset-a2');
//     presetA2.addEventListener('click', () => initializePreset('A', 60, a2));

//     const presetA3 = document.body.querySelector('.preset-a3');
//     presetA3.addEventListener('click', () => initializePreset('A', 90, a3));

//     const presetB1 = document.body.querySelector('.preset-b1');
//     presetB1.addEventListener('click', () => initializePreset('B', 70, b1));

//     const presetB2 = document.body.querySelector('.preset-b2');
//     presetB2.addEventListener('click', () => initializePreset('B', 60, b2));

//     const presetB3 = document.body.querySelector('.preset-b3');
//     presetB3.addEventListener('click', () => initializePreset('B', 60, b3));

//     const presetB4 = document.body.querySelector('.preset-b4');
//     presetB4.addEventListener('click', () => initializePreset('B', 72, b4));

//     function initializePreset(correctSoundKit, correctBPM, correctCheckboxes) {
//         clear();

//         setTimeout(() => {
//             (correctSoundKit === 'A') ? enableSoundKitA() : enableSoundKitB();
//         }, 150);
            
//         setTimeout(() => {
//             if (Tone.Transport.bpm.value !== correctBPM) updateBPM(correctBPM);
//         }, 175);

//         setTimeout(() => {
//             correctCheckboxes.forEach((coords) => {
//                 let currentBox = document.getElementsByClassName(`row-${coords[0]} col-${coords[1]}`)[0];
//                 currentBox.checked = true;
//             })
//         }, 200);

//         setTimeout(() => { play() }, 225);
//     }

//     // Looping Function

//     Tone.Transport.scheduleRepeat(runSequence, '16n')

//     function runSequence(time) {
//         let currentColumn = columnCounter % 32;

//         for (let row = 0; row < rows.length; row++) {
//             let currentRow = rows[row];
//             let currentPad = currentRow.querySelector(`label:nth-child(${currentColumn + 1})`)
//             let currentCheckBox = currentPad.querySelector('input')
            
//             if (currentSoundKit === 'A') {
//                 if (row < 8) {
//                     let currentSound = soundKitA[row];
//                     if (currentCheckBox.checked) currentSound.start(time);
//                 }
//             } else {
//                 let currentSynth = soundKitB[row];
//                 let currentPitch = pitches[row]; 
//                 if (currentCheckBox.checked) currentSynth.triggerAttackRelease(currentPitch, '16n');
//             }
//         }

//         Tone.Draw.schedule(time => {
//             let currentColumnPads = Array.from(document.getElementsByClassName(`col-${currentColumn}`));
//             currentColumnPads.forEach(pad => { pad.classList.add('active'); })

//             let previousColumn = (currentColumn === 0) ? (31) : (currentColumn - 1);
//             let previousColumnPads = Array.from(document.getElementsByClassName(`col-${previousColumn}`));
//             previousColumnPads.forEach(pad => { pad.classList.remove('active'); })
//         }, time)

//         columnCounter++;
//     }

// })