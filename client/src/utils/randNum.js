//get a random number
const getRandNum = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default getRandNum;