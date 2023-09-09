function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
 }
    let student1 = new Student("Михаил", "мужской", 21);
    let student2 = new Student("Дарья", "женский", 21);
    let student3 = new Student("Артем", "мужской", 24);
 Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
 }
 
 Student.prototype.addMarks = function (...marks) {
    if(this.marks === undefined){
       return 'Пользователь отчислен, добавление оценок невозможно'; 
    } else {
       this.marks.push(...marks);
    }
 }
 
 Student.prototype.getAverage = function () {
    if (this.marks === undefined || this.marks.length === 0) {
       return 0;
    } else {
       return this.marks.reduce((acc, item) => acc + item, 0) / this.marks.length
    }
 }
 
 Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason; 
    return 'плохая учёба'; 
 }
 