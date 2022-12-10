class Display{
    constructor(){
        this.simon = new Game()
        this.simon.createNewSequence(4)

        this.buttons = Array.from(document.getElementsByClassName("square"))
        this.quit = document.getElementById("exit")
        this.playButton = document.getElementById("play")

        this.attachEvents()

        this.colorOn=[
            "rgba(255, 255, 0, 0.5)",
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
                this.simon.addNewValueToTheUserSequence(i)
                console.log("button : ",i)
            })
        })
        this.quit.addEventListener("click",()=>{
            stopGame()
        })
        this.playButton.addEventListener("click",()=>{
            this.playSequence()
        })
    }
    stopGame(){
        console.log("stoping..")
    }


    playSequence(){
        let indexToPlay=0
            console.log("sequence : ", this.simon.sequence)
            const id = setInterval(()=>{
                if( indexToPlay < this.simon.sequence.length ){
                    console.log(`index : ${indexToPlay}, ${this.simon.sequence[indexToPlay] }`)
                    this.turnColorOnWithIndex( this.simon.sequence[indexToPlay] )
                    setTimeout( ()=>{
                        // console.log( "off", indexToPlay, this.colorOff[indexToPlay] )
                        // this.turnColorOffWithIndex(this.simon.sequence[indexToPlay])
                        this.turnEveryColorsOff()
                    },200)
                }else{
                    clearInterval(id)
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
    }
    turnColorOffWithIndex(colorIndex){
        console.log("==> off, index : ",this.simon.sequence[colorIndex], getComputedStyle(this.buttons[colorIndex]).backgroundColor)
        this.buttons[colorIndex].style.backgroundColor=this.colorOff[colorIndex]
        
    }
    turnEveryColorsOff(){
        this.buttons.forEach((button,i)=>{
            button.style.backgroundColor=this.colorOff[i]
        })
    }
}



class Game{
    constructor(){
        this.length=3
        this.sequence=[]
        this.userSequence=[]
    }

    createNewSequence = (ln) =>{
        const array = []
        for(let i=0 ; i<ln ; i++){
            array.push(Math.floor(Math.random()*4))
        }
        this.sequence = array
    }

    addNewValueToTheUserSequence(i){
        this.userSequence.push(i)
        console.log(this.userSequence)
    }
}

const display = new Display()


