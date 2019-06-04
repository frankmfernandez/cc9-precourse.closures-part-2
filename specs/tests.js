describe("gameGenerator", () => {
  it("should be there", () => {
    expect(gameGenerator).toBeDefined();
    expect(typeof gameGenerator).toBe("function");
  });

  it("should generate some games!", () => {
    const game = gameGenerator(4);
    expect(typeof game).toBe("object");
  });

  it("should have just one winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound + 1; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method", () => {
    // How do you test for this?
    const bound = 4;
    const winningNumber = randomInteger(bound)
    const game = gameGenerator(bound);
    game.reset()
    expect(game.bound === bound).toBeTruthy(); 
    //expect(game.winningNumber !== winningNumber).toBeTruthy();        
    expect(game.reset).toBeDefined();
    expect(typeof game.reset).toBe("function");
  });

  it("create your own test", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const trialGuess = 2;
    expect((game.winningNumber === trialGuess) === game.guess(trialGuess)).toBeTruthy()
    expect(typeof game.guess(5)).toBe("boolean");
    expect(game.reset).toBeDefined();
    expect(typeof game.reset).toBe("function");
  });
});

describe("accountGenerator", () => {
  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have some tests", () => {
    const initialBalance = 100;
    const account = accountGenerator(initialBalance)
    account.deposit(20)
    expect(account.getBalance()).toBe('Your balance is: $120')
    account.withdraw(130)
    expect(account.withdraw(130).status).toBe("denied")
    expect(account.averageTransaction().deposit).toBe(20)
    expect(account.transactionHistory(1)[0].amount).toBe(130)
  });
});
