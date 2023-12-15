import * as Tone from 'Tone'
window.addEventListener('DOMContentLoaded', () => {

    //samples column
    (() => {
        let drumMachineLeftColumn = document.body.querySelector('.drum-machine-left-column');
        let names = ['fas fa-drum-steelpan','fas fa-drum','fas fa-compact-disc','fas fa-compact-disc','fas fa-record-vinyl', 'fas fa-coins', 'fas fa-bahai', 'fas fa-sign-language']
            for (let i = 0; i <names.length; i++) {
                let sampleIcon = document.createElement('i');
                sampleIcon.className = names[i];
                drumMachineLeftColumn.appendChild(sampleIcon)
            }
    })()

    let topRow = document.createElement('div');
    topRow.className='top-row'
    for (let i = 0; i < 16; i++) {
        let button = document.createElement('div')
        button.classList.add('top-row-button')
        button.setAttribute("id", `r-${i}`)
        topRow.appendChild(button)
    }
    document.body.querySelector('.drum-machine-top-row').appendChild(topRow)

    //generateRows
    const generateRows = (rowNum) => {
        let drumMachineButtons = document.body.querySelector('.drum-machine-buttons')
        for (let i = 0; i < rowNum; i++) {
            let row = document.createElement('div')
            row.className=`full-row-${i}`
            for (let j = 0; j < 16; j++) {
                let button = document.createElement('input');
                button.classList.add(`row-${i}`, `col-${j}`,`drum-machine-button`)
                button.setAttribute("id",`r-${i}-c-${j}`)
                button.type = 'checkbox'
                row.appendChild(button)

                let label = document.createElement('label');
                label.classList.add(`row-${i}`, `col-${j}`,'button-label')
                label.setAttribute('for',`r-${i}-c-${j}`)
                row.appendChild(label)

            }
            drumMachineButtons.appendChild(row)
        }

        //prefilled
        let prefilled = document.querySelectorAll('.row-0.col-0,.row-0.col-8,.row-1.col-4,.row-1.col-12,.row-2.col-1,.row-2.col-2,.row-2.col-3,.row-2.col-5,.row-2.col-6,.row-2.col-7,.row-2.col-9,.row-2.col-10,.row-2.col-11,.row-2.col-13,.row-2.col-14,.row-2.col-15,.row-5.col-3,.row-5.col-11')
        prefilled.forEach(el=> {
            el.checked=true
        })
        
    }
    generateRows(8);

    document.querySelectorAll(".button-label, .drum-machine-button, .time-button").forEach( (item)=> {
        console.log(item)
        item.addEventListener('click', ()=>  {
            item.blur();
        })
    })


    document.querySelectorAll(".hidden").forEach(el=> {
        setTimeout(()=> {
            el.classList.remove('hidden')
        },400)
        
    })
        

    function sequencer(){
        document.documentElement.addEventListener("mousedown", () => {
            if (Tone.context.state !== 'running') {
                Tone.context.resume();
            }
        })

        let index=0;
        let playing = false

        Tone.Transport.bpm.value = 80;
        Tone.Transport.scheduleRepeat(repeat,'16n')
        Tone.Transport.set({swingSubdivision:'16n'})

    //effects
        const autoFilter = new Tone.AutoFilter(40,40)
        const delay = new Tone.FeedbackDelay("8n")
        const bitCrusher = new Tone.BitCrusher(1)
        
    //automation
        //bpm
        document.querySelector('.bpm-wetness').addEventListener('input', (e)=> {
            e.preventDefault
            let bpm = e.currentTarget.value
            Tone.Transport.bpm.set({
                value:bpm
            })
        document.querySelector('.bpm-visual').innerHTML = bpm
            let genre = document.querySelector('.genre')
            if (bpm <= 100) {
                genre.innerHTML = "Hip Hop/Slow Rock"
            }
            if (100 < bpm  && bpm <= 135) {
                genre.innerHTML = "Electronic/Pop/Rock"
            }
            if (135 < bpm) {
                genre.innerHTML = "Techno/Drum&Bass"
            } 
        })
        document.querySelector('.bpm-swing').addEventListener('input', (e) => {
            e.preventDefault
            let swing = e.currentTarget.value/100
            Tone.Transport.swing = swing
        })

        //autoFilter
        autoFilter.set({wet:1})
        autoFilter.set({baseFrequency: 20000})
        document.querySelector('.auto-filter-frequency').addEventListener('input', (e)=> {
            e.preventDefault
            autoFilter.set({
                baseFrequency:(Math.pow(e.currentTarget.value,1.9)+40)
            })
        })

        //delay
        delay.set({wet:0})
        document.querySelector('.delay-wetness').addEventListener('input', (e) => {
            e.preventDefault
            let wet = e.currentTarget.value/100
            delay.set({
                wet: wet
            })
        })
        
        //bitcrusher
        bitCrusher.set({wet:0})
        document.querySelector('.bitcrush-wetness').addEventListener('input', (e) => {
            e.preventDefault
            let wet = e.currentTarget.value/100
            bitCrusher.set({
                wet: wet
            })
        }) 

        //samples
        const kick = new Tone.Player('./dist/public/audio/kick.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const snare = new Tone.Player('./dist/public/audio/snare.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const hat = new Tone.Player('./dist/public/audio/hatSample.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const openHat = new Tone.Player('./dist/public/audio/openHat.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const ride = new Tone.Player('./dist/public/audio/rideCymbal.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const conga = new Tone.Player('./dist/public/audio/congaSample.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const crash = new Tone.Player('./dist/public/audio/crashSample.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);
        const clap = new Tone.Player('./dist/public/audio/clapSample.wav').connect(bitCrusher).chain(bitCrusher, delay, autoFilter, Tone.Destination);

        

        function repeat(time) {
            let step = index % 16;

            let alreadyLit = document.querySelectorAll('.lit-up')
            alreadyLit.forEach(el=> {
                if (el.classList) {
                    el.classList.remove('lit-up')
                }
            })
            document.getElementById(`r-${step}`).classList.add('lit-up')
                
            let kickInputs = document.getElementById(`r-0-c-${step}`)
            if(kickInputs.checked){
                kick.start(time)
            }
            
            let snareInputs = document.getElementById(`r-1-c-${step}`)
            if(snareInputs.checked){
                snare.start(time)
            }

            let hatInputs = document.getElementById(`r-2-c-${step}`)
            if (hatInputs.checked){
                hat.start(time)
            }

            let openHatInputs = document.getElementById(`r-3-c-${step}`)
            if (openHatInputs.checked){
                openHat.start(time)
            }

            let rideInputs = document.getElementById(`r-4-c-${step}`)
            if(rideInputs.checked){
                ride.start(time)
            }
            
            let congaInputs = document.getElementById(`r-5-c-${step}`)
            if(congaInputs.checked){
                conga.start(time)
            }

            let crashInputs = document.getElementById(`r-6-c-${step}`)
            if (crashInputs.checked){
                crash.start(time)
            }

            let clapInputs = document.getElementById(`r-7-c-${step}`)
            if (clapInputs.checked){
                clap.start(time)
            }

            index++
        }


        const playPauseTrack = () => {
            if (playing === false) {
                Tone.Transport.start()
                playing = true
                document.querySelector('.play-pause-button>i').className = 'far fa-play-circle'
                
            } else {
                Tone.Transport.pause()
                playing = false
                document.querySelector('.play-pause-button>i').className = 'fas fa-play-circle'

            }
        }

        const stopTrack = () => {
            Tone.Transport.stop()
            playing = false
            index = 0
            document.querySelector('.play-pause-button>i').className = 'fas fa-play-circle'
            let alreadyLit = document.querySelectorAll('.lit-up')
            alreadyLit.forEach(el=> {
                if (el.classList) {
                    el.classList.remove('lit-up')
                }
            })
        }

        const cleartrack = () => {
            document.querySelectorAll('input[type=checkbox]:checked').forEach(el=> {
                el.checked=false
          });
        }

        const playButton = document.querySelector('.play-pause-button')
        playButton.addEventListener('click', ()=> playPauseTrack());

        const stopButton = document.querySelector('.stop-button')
        stopButton.addEventListener('click', ()=> stopTrack());

        const clearButton = document.querySelector('.clear-button')
        clearButton.addEventListener('click', ()=> cleartrack())

        document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            playPauseTrack() 
        }
        } 
    }

    sequencer();
})