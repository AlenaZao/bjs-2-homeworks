

//Задача №1
function compareArrays(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}



//Задача №2
function getUsersNamesInAgeRange(users, gender) {
  let result = users.filter( user => user.gender === gender).reduce((acc, current, index, array) => acc + current.age / array.length, 0);
  return result;
}