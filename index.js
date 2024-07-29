/* Your Code Here */
const createEmployeeRecord = function (employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (employeeArrays) {
  return employeeArrays.map(createEmployeeRecord);
};

const createTimeInEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
};

const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
};

const hoursWorkedOnDate = function (date) {
  const timeInEvent = this.timeInEvents.find((timeIn) => timeIn.date === date);
  const timeOutEvent = this.timeOutEvents.find(
    (timeOut) => timeOut.date === date
  );
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const calculatePayroll = function (employeeRecords) {
  return employeeRecords.reduce(
    (total, record) => total + allWagesFor.call(record),
    0
  );
};
