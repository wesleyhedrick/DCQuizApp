const { Progress} = require('./models');

function createArrayOfAnswers(object){

    console.log('here is your object', object)
    let answersArray = [];
    for (key in object.dataValues){
        if(key.indexOf('nswer')>-1){
            console.log(object[key]);
            answersArray.push(object[key]);
        }
    }

    answersArray = shuffle(answersArray)
    return answersArray;

}    

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function questionRuling(playerAnswer, correctAnswer) {
    let ruling; 
    if(playerAnswer === correctAnswer){
        ruling = '/partials/correct'
    } else {
        ruling = '/partials/incorrect'
    }
    return ruling
}

const layout = {
    partials: {
        header: '/partials/header',
        footer: '/partials/footer'
    }    
};

async function getSavedData(username){
    const savedData = await Progress.findAll({
        where: {
            username
        }
    })
    return savedData;
}

  module.exports = {
    createArrayOfAnswers, 
    shuffle, 
    questionRuling, 
    layout, 
    getSavedData
  }