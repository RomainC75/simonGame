class Game {
  constructor() {
    this.sequenceLength = [4, 5, 6, 7, 8];
    this.sequence = [];
    this.userSequence = [];
    this.isUserTurn = false;
    this.points = 0;
    this.level = 0;
  }

  createNewSequence = () => {
    const array = [];
    const ln =
      this.level > 4 ? this.sequenceLength[4] : this.sequenceLength[this.level];
    if (this.level < 0) {
      this.sequence = [];
      return null;
    }
    for (let i = 0; i < ln; i++) {
      array.push(Math.floor(Math.random() * 4));
    }
    this.sequence = array;
  };

  addNewValueToTheUserSequence(i) {
    if (typeof i !== "number" || i > 3 || i < 0) {
      return null;
    }
    if (!this.isUserTurn) {
      return;
    }
    this.userSequence.push(i);
    console.log("new sequence : ", this.userSequence);
    if (this.userSequence.length === this.sequence.length) {
      console.log(
        "isSequenceAndUserSequenceEqual",
        this.isSequenceAndUserSequenceEqual()
      );
      this.sequence = [];
      this.userSequence = [];
      this.isUserTurn = false;
    }
  }

  getIsUserTurn() {
    return this.isUserTurn;
  }

  alternateReadWriteMode() {
    console.log("alternate");
    this.isUserTurn = !this.isUserTurn;
  }

  isSequenceAndUserSequenceEqual() {
    if (
      !Array.isArray(this.sequence) ||
      !Array.isArray(this.userSequence) ||
      this.userSequence.length != this.sequence.length
    ) {
        return null
    }
    let isEqual = true;
    this.sequence.forEach((buttonIndex, i) => {
      if (buttonIndex != this.userSequence[i]) {
        isEqual = false;
      }
    });
    if (isEqual) {
      this.addpoint();
    }
    return isEqual;
  }

  isTheLastSequenceElementGood() {
    if(!Array.isArray(this.userSequence) || !Array.isArray(this.sequence)){
        return null
    }
    return (
      this.userSequence[this.userSequence.length - 1] ===
      this.sequence[this.userSequence.length - 1]
    );
  }

  addpoint() {
    this.points += 1;
    if (this.level < 5 && this.points % 2 == 0) {
      this.level += 1;
      console.log("level up ! ", this.level);
    }
  }

  resetPointsAndLevel() {
    this.points = 0;
    this.level = 0;
  }

  resetUserSequence() {
    this.userSequence = [];
  }
}

export { Game };
