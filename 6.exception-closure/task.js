function parseCount(a) {
    let parseResult = Number.parseFloat(a);
    if (Number.isNaN(parseResult)) {
       throw new Error("Невалидное значение");
    }
    return parseResult;
 }
 
 function validateCount(b) {
    try {
       return parseCount(b);
    } catch (error) {
       return error;
    }
 }
 
 class Triangle {
    constructor (a, b, c) {
       if (a + b < c || a + c < b || b + c < a) {
          throw new Error ("Треугольник с такими сторонами не существует")
       }
       this.a = a;
       this.b = b;
       this.c = c; 
    }
 
    get perimeter() {
       return this.a + this.b + this.c;
    }
    
    get area() {
       const p = this.perimeter / 2;
       return Number(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c)).toFixed(3));
    }     
 }  
 
 function getTriangle(d, e, f) {
    try {
       return new Triangle(d, e, f);
    } catch (error) {
       return  new Object( {
          get perimeter() {
             return "Ошибка! Треугольник не существует";
          },
          get area() {
             return "Ошибка! Треугольник не существует";
          }
       });
    }
 }
 
 
 class AlarmClock {
    constructor(alarmCollection, intervalId) {
      this.alarmCollection = [];
      this.intervalId = null;
   }
  
    addClock(time, callback ) {
      if(!time || !callback) {
        throw new Error("Отсутствуют обязательные аргументы");
      } else if (this.alarmCollection.some(item => item.time === time)) {
        console.warn("Уже присутствует звонок на это же время");
      }
  
      let alarm = {
          callback: callback,
          time: time,
          canCall: true
      }
  
      this.alarmCollection.push(alarm);
     }
    
    removeClock(time) {
      this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
    }
  
    getCurrentFormattedTime() {
      let currentDate = new Date();
      let hours = currentDate.getHours().toString().padStart(2, 0);
      let minutes = currentDate.getMinutes().toString().padStart(2, 0);
      return `${hours}:${minutes}`;
    }
  
    start() {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          let currentTime = this.getCurrentFormattedTime();
          this.alarmCollection.forEach((alarm) => {
            if (alarm.time === currentTime && alarm.canCall) {
              alarm.canCall = false;
              alarm.callback();
            }
          });
        }, 1000);
      }
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() {
      this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
  }
 
 
  //8 задание
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
    let isFirstCall = false; //   Указывает разрешено ли в данный момент вызывать функцию или нужна задержка
    
    function wrapper(...args) {
      clearTimeout(timeoutId); //  вызывается чтобы очистить предыдущий таймер, если он был установлен ранее.
      timeoutId = setTimeout( () => { // устанавливается новый таймер (вызывает исх.функцию, увеличивает счетчик для отслеживания кол-ва вызовов) 
        func(args);
        wrapper.count++;
        }, delay);
  
      if (!isFirstCall) {
        func(...args); 
        wrapper.count++;
        isFirstCall = true; // Устанавливается значение isFirstCall в true, чтобы указать, что функция была вызвана и требуется задержка перед следующим вызовом.
      }
        wrapper.allCount++; //  увеличивает счетчик, кот. отслеживает общее количество вызовов декоратора.
      }
      // Функции wrapper добавляются свойства count и allCount для отслеживания кол-ва вызовов функции и общего кол-ва вызовов декоратора.
      wrapper.count = 0;
      wrapper.allCount = 0;
      return wrapper; // функция wrapper возвращается в качестве результата декоратора
  }
  