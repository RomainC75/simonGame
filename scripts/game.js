class Game{
    constructor(){
        this.sequenceLength=4
        this.sequence=[]
        this.userSequence=[]
        //==========
        this.userNeedsToEnterTheSequence=false
        this.points=0
    }
    createNewSequence = () =>{
        const array = []
        for(let i=0 ; i<this.sequenceLength ; i++){
            array.push(Math.floor(Math.random()*4))
        }
        this.sequence = array
    }
    addNewValueToTheUserSequence(i){
        if(!this.userNeedsToEnterTheSequence){
            return
        }
        this.userSequence.push(i)
        console.log("new sequence : ",this.userSequence)
        if(this.userSequence.length === this.sequence.length){
            console.log("isSequenceAndUserSequenceEqual",this.isSequenceAndUserSequenceEqual())
            if(this.isSequenceAndUserSequenceEqual()){
                this.points+=1
            }
            this.sequence=[]
            this.userSequence=[]
            this.userNeedsToEnterTheSequence=false
        }
    }
    getUserNeedsToEnterTheSequence(){
        return this.userNeedsToEnterTheSequence
    }
    alternateReadWriteMode(){
        console.log("alternate")
        this.userNeedsToEnterTheSequence =! this.userNeedsToEnterTheSequence
    }
    isSequenceAndUserSequenceEqual(){
        let isEqual = true
        this.sequence.forEach((buttonIndex,i)=>{
            if(buttonIndex!=this.userSequence[i]){
                isEqual = false
            }
        })
        return isEqual
    }
}
