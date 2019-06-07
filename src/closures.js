/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/
// Test: gameGenerator the giveUp function sets a new winning number
// Error: Error: Expected true to be false.

// Test: gameGenerator the giveUp function resets the number of guesses
// Error: TypeError: game.numberGuesses is not a function

// Test: gameGenerator the guess function guessing increases numGuesses()
// Error: TypeError: game.numberGuesses is not a function

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(num) {
  let winningNumber = randomInteger(num);
  let upperBound = num;
  let guesses = []
  return {
    bound : upperBound,
    winningNumber : winningNumber,
    // set setWinningNumber (winningNumber) {
    //   this.winningNumber = winningNumber
    // },
    get getReset (){
      return this.reset
    },
    reset : ()=>{
      guesses = [];
      winningNumber = randomInteger(num);
    },
    giveUp : ()=>{
      let previousWinningNumber = winningNumber
      guesses = [];
      winningNumber = randomInteger(num);
      return previousWinningNumber},//getWinningNumber},
    guess : (guessNumber)=>{
      if(guessNumber === winningNumber){ 
        return true;
      } else {
        guesses.push(guessNumber)
        return false;
      }
    },
    numberGuesses : () =>{
      return guesses.length
    }
  }
}

// Test: accountGenerator the transactionHistory function contains transactions from previous operations
// Error: Error: Expected $[0].before = 500 to equal 0.

// Test: accountGenerator the transactionHistory function returns only the last x transactions
// Error: Error: Expected $[0].type = 'deposit' to equal 'withdrawl'.

// Test: accountGenerator the getBalance function returns correct balance after a deposit
// Error: Error: Expected 'Your balance is: $600' to be 600.

// Test: accountGenerator the getBalance function should return the initial balance
// Error: Error: Expected 'Your balance is: $0' to be 0.

// Test: accountGenerator the getBalance function returns correct balance after a withdrawal
// Error: Error: Expected 'Your balance is: $500' to be 500.

// Test: accountGenerator the withdraw function the return value has correct values for the fields and denies transactions that would cause the balance to drop below 0
// Error: Error: Expected 'withdrawl' to be 'withdrawal'.

function accountGenerator(initial) {
  let balance = initial;
  let transactions = []
  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        let startingBalance = balance
        balance = balance - amount;
        transactions.push({
          type: "withdrawal",
          amount: amount,
          before: startingBalance, 
          after: balance,
          status: "approved",
          time: new Date()
        })
        return {
          type: "withdrawal",
          amount: amount,
          before: startingBalance,
          after: balance,
          status: "approved",
          time: new Date()
        };
      }
      
      transactions.push({
        type: "withdrawal",
        amount: amount,
        before: balance,
        after: balance,
        status: "denied",
        time: new Date()
      })
      return {
        type: "withdrawal",
        amount: amount,
        before: balance,
        after: balance,
        status: "denied",
        time: new Date()
      };;
    },
    
    deposit: function(amount) {
      let startingBalance = balance;
      balance = balance + amount;
      transactions.push({
        type: "deposit",
        amount: amount,
        before: startingBalance,
        after: balance,
        status: "approved",
        time: new Date()
      })
      return {
          type: "deposit",
          amount: amount,
          before: startingBalance,
          after: balance,
          status: "approved",
          time: new Date()
        };
    },
    getBalance: ()=>{
      return balance;
    },
    transactionHistory: (n)=>{
       let result = [];
       for (let i = transactions.length - n ; i < transactions.length ; i++){
        // for (let i = 0; i < n; i++){
        result.push(transactions[i])
      }
      return result;
      
      // let result = [];
      // for (let i = transactions.length - 1; i > transactions.length - 1 - n; i--){
      //   // for (let i = 0; i < n; i++){
      //   result.push(transactions[i])
      // }
      // return result;
    },
    averageTransaction: ()=>{
      let depositAmount = 0;
      let depositCount = 0;
      let withdrawlAmount = 0;
      let withdrawlCount = 0;
      
      for (let i = 0; i < transactions.length; i++){
        if (transactions[i].type === "deposit"){
          depositAmount = depositAmount + transactions[i].amount;
          depositCount = depositCount + 1;
        }
      }

      for (let i = 0; i < transactions.length; i++){
        if (transactions[i].type === "withdrawal" && transactions[i].status === "approved"){
          withdrawlAmount = withdrawlAmount + transactions[i].amount;
          withdrawlCount = withdrawlCount + 1;
        }
      }
      
      return {
        deposit:depositAmount/depositCount,
        withdrawl:withdrawlAmount/withdrawlCount,
      }
    }
  };
}
