class Display{
    constructor(){
        this.simon = new Game()
        this.buttons = Array.from(document.getElementsByClassName("square"))
        this.resetButton = document.getElementById("reset")
        this.points = document.getElementById("points")
        this.playButton = document.getElementById("play")
        this.indicator = document.getElementById("indicator")
        this.sequenceLengthCounter = document.querySelector("#sequenceLength > div")
        this.isSequenceBeingPlayed = false
        this.simonContainer = document.querySelector(".container")
        this.attachEvents()

        this.colorOn=[
            "rgba(255, 218, 0, 0.5)",
            "rgba(0, 0, 255, 0.5)",
            "rgba(255, 0, 0, 0.5)",
            "rgba(0, 128, 0, 0.5)"
        ]
        this.colorOff=[
            "rgba(255, 255, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(255, 0, 0, 1)",
            "rgba(0, 128, 0, 1)"
        ]
    }
    attachEvents(){
        console.log(this.buttons)
        this.buttons.forEach( (button, i)=>{
            console.log("====")
            button.addEventListener('click',e=>{
                if(!this.isSequenceBeingPlayed){
                    this.turnColorOnWithIndex(i)
                    this.simon.addNewValueToTheUserSequence(i)
                    console.log("button : ",i, this.isSequenceBeingPlayed)
                    if(!this.simon.isTheLastSequenceElementGood()){
                        //cancel la sequence
                        // userNeedsToEnterSequence => false
                        this.simon.alternateReadWriteMode()
                        // simon.userSequence => []
                        this.simon.resetUserSequence()
                        // counter =>0
                        // automatique avec updateIndicator
                        console.log("+=====> FALSE ! back tyo the beginning")
                        this.showSequenceIsFalse()
                    }
                }
                this.updateIndicator()
                this.updatePoints()
                this.updateSequenceLengthCounter()
            })
        })
        this.resetButton.addEventListener("click",()=>{
            this.resetGame()
        })
        this.playButton.addEventListener("click",()=>{
            this.playSequence()
        })
    }
    resetGame(){
        console.log("stoping..")
    }
    playSequence(){
        if(this.simon.getUserNeedsToEnterTheSequence()){
            console.log("==> Error : the sequence can be played only one time")
            return
        }
        this.simon.createNewSequence()
        this.simon.alternateReadWriteMode()
        this.isSequenceBeingPlayed=true
        this.updateIndicator()
        let indexToPlay=0
        console.log("sequence : ", this.simon.sequence)
        const id = setInterval(()=>{
            if( indexToPlay < this.simon.sequence.length ){
                console.log(`index : ${indexToPlay}, ${ this.simon.sequence[indexToPlay] }`)
                this.turnColorOnWithIndex( this.simon.sequence[indexToPlay] )
            }else{
                clearInterval(id)
                this.isSequenceBeingPlayed=false
                this.updateIndicator()
                console.log(this.colorOn)
                console.log(this.colorOff)
            }
            indexToPlay++
            },1000)
    }
    setDelay(code){
        setTimeout(()=>{
            console.log("===>",code)
            this.buttons[code].classList.add("shine")
        }, 1000)
    }
    turnColorOnWithIndex(colorIndex){
        console.log("==> on , index : ",this.simon.sequence[colorIndex], getComputedStyle(this.buttons[colorIndex]).backgroundColor)
        this.buttons[colorIndex].style.backgroundColor=this.colorOn[colorIndex]
        setTimeout( ()=>{
            this.buttons[colorIndex].style.backgroundColor=this.colorOff[colorIndex]
        },200)
    }
    turnEveryColorsOff(){
        this.buttons.forEach((button,i)=>{
            button.style.backgroundColor=this.colorOff[i]
        })
    }
    updatePoints(){
        this.points.innerText =this.simon.points
    }
    resetGame(){
        this.simon.resetPoints()
        this.updatePoints()   
    }
    updateIndicator(){
        console.log('==> Update indicator')
        const textPlace = this.indicator.querySelector("p")
        if(this.isSequenceBeingPlayed){
            textPlace.innerText="READ"
            this.removeIndicatorClasses()
            this.indicator.classList.add("readIndicator")
        }else if(this.simon.getUserNeedsToEnterTheSequence()){
            textPlace.innerText="ENTER"
            this.removeIndicatorClasses()
            this.indicator.classList.add("enterIndicator")
        }else{
            textPlace.innerText="waiting"
            this.removeIndicatorClasses()
            this.indicator.classList.add("waitingIndicator")
        }
    }
    removeIndicatorClasses(){
        this.indicator.classList.remove("waitingIndicator")
        this.indicator.classList.remove("readIndicator")
        this.indicator.classList.remove("enterIndicator")
    }

    updateSequenceLengthCounter(){
        this.sequenceLengthCounter.innerText = this.simon.userSequence.length
    }

    showSequenceIsFalse(){
        this.simonContainer.classList.add('badAnswer')
        setTimeout(()=>{
            this.simonContainer.classList.remove("badAnswer")
        },1000)
    }
}

//animation when sequence is fully entered
//reset button

