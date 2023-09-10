class AlarmClock {
    constructor() {
       this.alarmCollection = [];
       this.intervalId = null;
    }
    
    addClock(time, callback) {
       if (time === null || callback === undefined) {
          throw new Error ('Отсутствуют обязательные аргументы');
       } else if (this.alarmCollection.find(item => item.time === time)) {
          console.warn('Уже присутствует звонок на это же время');
       }
       
       let alarm = {
       time: time,
       callback: callback,
       canCall: true
       }
       
       this.alarmCollection.push(alarm);
    }
 
    removeClock(time) {
       this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
    }
 
    getCurrentFormattedTime() {
    return new Date().toTimeString().slice(0, 5); 
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
       if (this.intervalId !== null) {
       clearInterval(this.intervalId);
       this.intervalId = null;
       }
    }
 
    resetAllCalls() {
       this.alarmCollection.forEach(alarm => alarm.canCall = true);
    }
 
    clearAlarms() {
       this.stop();
       this.alarmCollection = [];
    }
 }
 