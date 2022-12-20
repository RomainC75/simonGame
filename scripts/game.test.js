import { getMaxListeners } from "process";
import { getSystemErrorMap } from "util";
import { it, describe, expect, beforeEach } from "vitest";

import { Game } from "./game";
let game;

describe("game tests", () => {
  beforeEach(() => {
    game = new Game();
  });

  it("should create an object", () => {
    expect(game.level).toBe(0);
  });

  it("should create a sequence with the good length", () => {
    game.createNewSequence();
    expect(game.sequence.length).toBe(4);

    game.level = 1;
    game.createNewSequence();
    expect(game.sequence.length).toBe(5);

    game.level = 145;
    game.createNewSequence();
    expect(game.sequence.length).toBe(8);

    game.level = -1;
    game.createNewSequence();
    expect(game.sequence.length).toBe(0);
    expect(game.createNewSequence()).toBeNull();
  });

  it('should not add a new value if it"s not the user turn', () => {
    game.createNewSequence();
    game.addNewValueToTheUserSequence(0);
    expect(game.userSequence[0]).not.toBeDefined();
  });

  //======= addNewValueToTheUserSequence ========
  it("should return null if the entered value is a string", () => {
    game.createNewSequence();
    const ans1 = game.addNewValueToTheUserSequence("a");
    expect(ans1).toBeNull();
  });

  it("should return null if the entered value is a negative number", () => {
    game.createNewSequence();
    const ans1 = game.addNewValueToTheUserSequence(-1);
    expect(ans1).toBeNull();
  });

  it("should return null if the entered value is greater than 3", () => {
    game.createNewSequence();
    const ans1 = game.addNewValueToTheUserSequence(56);
    expect(ans1).toBeNull();
  });

  it("should not change the userSequence if it's not the user turn",()=>{
    game.createNewSequence()
    const firstElement = game.sequence[0]
    game.isUserTurn=false
    game.addNewValueToTheUserSequence(firstElement)
    expect(game.userSequence.length).toBe(0)
  })

  //======= getIsUserTurn ========
  it("should be false if isUserTurn is false",()=>{
    game.isUserTurn = false
    const isUserTurn = game.isUserTurn
    expect(isUserTurn).toBe(false)
  })
  it("should be false if isUserTurn is false",()=>{
    game.isUserTurn = true
    const isUserTurn = game.isUserTurn
    expect(isUserTurn).toBe(true)
  })

  //======= alternateReadWriteMode =====
  it('should be true if isUserTurn if false',()=>{
    game.isUserTurn=false
    game.alternateReadWriteMode()
    expect(game.isUserTurn).toBe(true)
  })

  //======= isSequenceAndUserSequenceEqual ======
  it('should return null if sequence or userSequence is not an Array',()=>{
    game.sequence=2
    game.userSequence=[0,1,2,3]
    const ans1 = game.isSequenceAndUserSequenceEqual()

    game.userSequence=2
    game.sequence=[0,1,2,3]
    const ans2 = game.isSequenceAndUserSequenceEqual()

    expect(ans1).toBeNull()
    expect(ans2).toBeNull()
  })

  it('should return null if sequence and userSequence are not the same size',()=>{
    game.sequence=[0,1,2,3]
    game.userSequence=[0,1,2,3,2]
    const ans1 = game.isSequenceAndUserSequenceEqual()

    game.userSequence=[0,1,2,3]
    game.sequence=[0,1,2,3,2]
    const ans2 = game.isSequenceAndUserSequenceEqual()

    expect(ans1).toBeNull()
    expect(ans2).toBeNull()
  })

  it('should return false if the sequence are not equal',()=>{
    game.sequence=[0,1,2,3]
    
    game.userSequence=[0,1,3,2]
    const ans1 = game.isSequenceAndUserSequenceEqual()
    
    game.userSequence=[0,1,2,2]
    const ans2 = game.isSequenceAndUserSequenceEqual()

    game.userSequence=[3,1,2,2]
    const ans3 = game.isSequenceAndUserSequenceEqual()

    expect(ans1).toBe(false)
    expect(ans2).toBe(false)
    expect(ans3).toBe(false)
  })
  it('should return true is the squences are equal',()=>{
    game.sequence=[0,1,2,3]

    game.userSequence=[0,1,2,3]
    const ans1 = game.isSequenceAndUserSequenceEqual()

    expect(ans1).toBe(true)
  })

  //= addpoint
  it('should add a point',()=>{
    game.points=2
    game.addpoint()
    expect(game.points).toBe(3)
  })

  //===reset points and level
  it('should reset points and level',()=>{
    game.points=3
    game.level=1
    game.resetPointsAndLevel()
    expect(game.level).toBe(0)
    expect(game.points).toBe(0)
  })

    //=== isTheLastSequenceElementGood ===
    it('should return null if one sequence is not an array', ()=>{
      game.sequence=null
      game.userSequence=[0,1,2,3]
      const ans1 = game.isTheLastSequenceElementGood()
      
      game.sequence=[0,1,2,3]
      game.userSequence=3
      const ans2 = game.isTheLastSequenceElementGood()

      expect(ans1).toBeNull()
      expect(ans2).toBeNull()

    })

    it('should return false if the last element of the user sequence if not correct',()=>{
      game.sequence=[0,1,2,3,1]
      
      game.userSequence=[0,2]
      const ans1 = game.isTheLastSequenceElementGood()
      
      game.userSequence=[0,1,3]
      const ans2 = game.isTheLastSequenceElementGood()

      game.userSequence=[0,1,2,3,1,1]
      const ans3 = game.isTheLastSequenceElementGood()

      expect(ans1).toBe(false)
      expect(ans2).toBe(false)
      expect(ans3).toBe(false)
    })

    it('should return true if the last element of the user sequence if correct',()=>{
      game.sequence=[0,1,2,3,1]
      
      game.userSequence=[0,1]
      const ans1 = game.isTheLastSequenceElementGood()

      game.userSequence=[0,2,3,1]
      const ans2 = game.isTheLastSequenceElementGood()

      expect(ans1).toBe(true)
    })
});
