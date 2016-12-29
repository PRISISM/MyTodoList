/**
 *  app.js
 *
 * Main container for app - controllers, services, directives ... 
 * Declare module and configure. 
 * Array is the list of modules that myApp depends on. A module can depend on other modules.
 */
var myTodoModule = angular.module('myTodo', ['todoController', 'todoService']);

