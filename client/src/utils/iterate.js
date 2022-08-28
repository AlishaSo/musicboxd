const iterateArr = array => {
  let string = array[0].name;

  for(let i = 1; i < array.length; i++) {
    string += `, ${array[i].name}`;
  }

  return string;
}

export default iterateArr;