var DataTypes = require("sequelize").DataTypes;
var _lesson_students = require("./lesson_students");
var _lesson_teachers = require("./lesson_teachers");
var _lessons = require("./lessons");
var _students = require("./students");
var _teachers = require("./teachers");

function initModels(sequelize) {
  var lesson_students = _lesson_students(sequelize, DataTypes);
  var lesson_teachers = _lesson_teachers(sequelize, DataTypes);
  var lessons = _lessons(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var teachers = _teachers(sequelize, DataTypes);

  /*lessons.hasMany(lesson_students, { as: 'lesson_students', foreignKey: 'lesson_id'});
  lesson_students.belongsTo(lessons, { as: 'lessons', foreignKey: 'lesson_id'});

  students.hasMany(lesson_students, { as: 'lesson_students', foreignKey: 'student_id'});
  lesson_students.belongsTo(students, { as: 'students', foreignKey: 'student_id'});*/
 
  lessons.belongsToMany(students, {through: lesson_students, foreignKey: 'lesson_id'})
  students.belongsToMany(lessons, {through: lesson_students, foreignKey: 'student_id'})

  lessons.belongsToMany(teachers, {through: lesson_teachers, foreignKey: 'lesson_id'})
  teachers.belongsToMany(lessons, {through: lesson_teachers, foreignKey: 'teacher_id'})

  /*lesson_teachers.belongsTo(lessons, { as: "lessons", foreignKey: "lesson_id"});
  lessons.hasMany(lesson_teachers, { as: "lesson_teachers", foreignKey: "lesson_id"});

  lesson_teachers.belongsTo(teachers, { as: "teachers", foreignKey: "teacher_id"});
  teachers.hasMany(lesson_teachers, { as: "lesson_teachers", foreignKey: "teacher_id"});*/

  return {
    lesson_students,
    lesson_teachers,
    lessons,
    students,
    teachers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
