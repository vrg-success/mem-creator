export default function newId(arr) {
  let maxId = arr.reduce((acc, item) => {
    if (acc < item.id) acc = item.id;
    return acc;
  }, 0);

  return ++maxId;
}