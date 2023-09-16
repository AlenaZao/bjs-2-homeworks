//Задача № 1
function cachingDecoratorNew(func) {
    let cache = new Map();
    let arr = [];
    let count = 0;
 
    return function(...args) {
       const hash = [...args];
 
       if(hash in cache) {
          const index = arr.indexOf(hash);
          arr.splice(index, 1);
          arr.push(hash);
          return `Из кэша: ${cache[hash]}`;
       }
 
       const result = func(...args);
       cache[hash] = result;
       arr.push(hash);
       count++;
 
       if(count > 5) {
          const oldHash = arr.shift();
          delete cache[oldHash];
          count--;
       }
 
       return `Вычисляем: ${result}`;
    }
 }
 
 
 //Задача № 2
 function debounceDecoratorNew(func, delay) {
    let timeoutId;
    let isFirstCall = false; 
 
    function wrapper(...args) {
       clearTimeout(timeoutId); 
       timeoutId = setTimeout( () => { 
       func(args);
       wrapper.count++;
       }, delay);
 
    if (!isFirstCall) {
       func(...args); 
       wrapper.count++;
       isFirstCall = true; 
    }
       wrapper.allCount++;
    }
    
       wrapper.count = 0;
       wrapper.allCount = 0;
       return wrapper;
 }
 