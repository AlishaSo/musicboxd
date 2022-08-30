const filterDuplicates = albumsArr => {
  let map = new Map();

  albumsArr = albumsArr.filter(album => {
    if(!map.has(album.title)) {
      map.set(album.title, 1);
      return album;
    }
  });

  return albumsArr;
}

export default filterDuplicates;