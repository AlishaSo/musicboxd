export const iterateToGetNames = array => {
  let string = array[0].name;

  for(let i = 1; i < array.length; i++)
    string += `, ${array[i].name}`;

  return string;
}

export const iterateToGetAlbumIds = array => {
  return array.map(item => item.track.album.id);
}

const iterateFunctions = {
  iterateToGetNames, 
  iterateToGetAlbumIds
}

export default iterateFunctions;