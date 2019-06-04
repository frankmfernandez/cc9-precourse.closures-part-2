/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/
// function getAndSet() {
//   // YOUR CODE HERE
//   let getSet = {}
//   getSet.value
//   getSet.set = (val)=>{this.value = val}
//   getSet.get = ()=>{return this.value}
//   return getSet
// }

// let objectExam = getAndSet()
// objectExam.set(5)
// console.log(objectExam.value)
// console.log(objectExam.get())
// objectExam.value = 3
// console.log(objectExam.value)
// console.log(objectExam.get())

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
    // get getWinningNumber (){
    //   return this.winningNumber
    // },
    reset : ()=>{
      guesses = [];
      winningNumber = randomInteger(num);
    },
    giveUp : ()=>{
      let previousWinningNumber = winningNumber
      gameGenerator(num)
      return previousWinningNumber},//getWinningNumber},
    guess : (guessNumber)=>{
      if(guessNumber === winningNumber){ 
        return true;
      } else {
        guesses.push(guessNumber)
        return false;
      }
    },
    numGuesses : () =>{
      return guesses.length
    }
  }
}

function accountGenerator(initial) {
  let balance = initial;
  let transactions = []
  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        let startingBalance = balance
        balance = balance - amount;
        transactions.push({
          type: "withdrawl",
          amount: amount,
          before: startingBalance, 
          after: balance,
          status: "approved",
          time: new Date()
        })
        return {
          type: "withdrawl",
          amount: amount,
          before: startingBalance,
          after: balance,
          status: "approved",
          time: new Date()
        };
      }
      transactions.push({
        type: "withdrawl",
        amount: amount,
        before: balance,
        after: balance,
        status: "denied",
        time: new Date()
      })
      return {
        type: "withdrawl",
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
      return `Your balance is: $${balance}`;
    },
    transactionHistory: (n)=>{
      let result = [];
      for (let i = transactions.length - 1; i > transactions.length - 1 - n; i--){
        result.push(transactions[i])
      }
      return result;
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
        if (transactions[i].type === "withdrawl" && transactions[i].status === "approved"){
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
