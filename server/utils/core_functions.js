const { resolve } = require("path");
const con = require("../config/connect_mysql");
const crypto = require('crypto');
const { resolveTxt } = require("dns");

/**
 * generates a random code
 * 
 * @param {number} length - the length of random code in byte
 * @param {string} table - the table name
 * @param {string} attribute - the attribute that need a random code
 *  
 * @returns the random code in upper case
 */
function GENERATE_RANDOM_CODE(length, table, attribute) {
  return new Promise((resolve, reject) => {
    var randomCode = crypto.randomBytes(length).toString("hex").toUpperCase();
    CHECK_EXIST(table, [attribute],  [randomCode])
    .then((value) => {
      if (value) {
        resolve({code: randomCode, unique: false});
      } else {
        resolve({code: randomCode, unique: true});
      }
    })
  })
}

/**
 * checks if the data is valid or not
 * 
 * @param {string} tableName - Name of the table want to check
 * @param {array} attributes - schema of the table 
 * @param {array} values - value want to check
 * 
 * @returns {false} - the data does not exist in the table
 * @returns {true}  - the data already exists in the table
 */
function CHECK_EXIST(tableName, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    con.query(
      "SELECT COUNT(*) AS count FROM " + tableName + " WHERE " + value + ";",
      (err, result, field) => {

        if (err) {
          console.log(err);
        } else {
          if (result[0].count === 0) {
            resolve(false);
          } else if (result[0].count > 0) {
            resolve(true);
          }
        }
      }
    );
  });
}

/**
 * modifies length of the array of data after delete unwanted value
 *
 * @param {string} array - the input data from the user after removing unwanted value
 * 
 * @returns {array} - the wanted remaining array
 */
function LENGTH_CHECKER(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (!DATA_CHECKER(array[i])) {
      array.pop();
    } else {
      return array;
    }
  }
}

/**
 * detect undefined, null and no value of data
 *
 * @param {string} data - input data from the user
 * 
 * @returns {true} - the data can be used 
 * @returns {false} - the data can not be used
 */
function DATA_CHECKER(data) {
  if (typeof data != undefined && data != null && data != "") {
    return true;
  } else {
    return false;
  }
}

/**
 * selects value of specific columns of a table
 *
 * @param {string} tableName - Name of the table to select
 * @param {[string]}} field - schema want to select from the table
 * @param {[string]} attributes - the attributes part
 * @param {[string]} values - the values part
 * 
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info, queryInfo, queryError} - data of the column 
 */
function SELECT(tableName, field, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    var fieldValue = "";

    for (var i = 0; i < field.length; i++) {
      if (DATA_CHECKER(field[i])) {
        fieldValue += field[i];

        if (i != field.length - 1) {
          fieldValue += ", ";
        }
      }
    }

    con.query(
      "SELECT " + fieldValue + " FROM " + tableName + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ info: result, queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * selects the information inside the table
 *
 * @param {string} tableName - Name of the table to select information
 * 
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info, queryInfo, queryError} - all the data inside the table
 */
function SELECT_TABLE(tableName) {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM " + tableName + ";", (err, result, field) => {

      if (err) {
        console.log(err);
        resolve({ queryInfo: 0, queryError: 1 });
      } else {
        resolve({ info: result, queryInfo: 1, queryError: 0 });
      }
    });
  });
}

/**
 * selects the information inside the table with two more options including
 *  ORDER BY
 *  LIMIT
 *
 * @param {string} tableName - Name of the table to select information
 * @param {[string]} field - schema want to select from the table
 * @param {[string]} orderAttribute - the attribute to order by
 * @param {integer} limitValue - the limit of how many to select
 * 
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info, queryInfo, queryError} - all the data restricted with the two options
 */
function SELECT_V2(tableName, field, orderAttribute, limitValue) {
  return new Promise((resolve, reject) => {
    var fieldValue = "";

    for (var i = 0; i < field.length; i++) {
      if (DATA_CHECKER(field[i])) {
        fieldValue += field[i];

        if (i != field.length - 1) {
          fieldValue += ", ";
        }
      }
    }

    con.query(
      "SELECT " + fieldValue + " FROM " + tableName + " ORDER BY " + orderAttribute + " LIMIT " + limitValue + ";",
      (err, result, fields) => {
        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ info: result, queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * describes the information of the table
 *
 * @param {string} tableName - Name of the table to describe
 * 
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info, queryInfo, queryError} - the information of the table
 */
function DESCRIBE(tableName) {
  return new Promise((resolve, reject) => {
    con.query("DESCRIBE " + tableName + ";", (err, result, field) => {

      if (err) {
        console.log(err);
        resolve({ queryInfo: 0, queryError: 1 });
      } else {
        resolve({ info: result, queryInfo: 1, queryError: 0 });
      }
    });
  });
}

/**
 * inserts values into a table
 *
 * @param {string} tableName The name of the table to insert into
 * @param {[string]} schema Name of the column of the table to insert into
 * @param {[string]} data The value to insert into the table
 * @returns {queryInfo, queryError} - values for debugging
 */
function INSERT_INTO(tableName, schema, data) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < data.length; i++) {
      value += "'" + data[i] + "'";

      if (i != data.length - 1) {
        value += ", ";
      }
    }

    var schemaValue = "";

    if (DATA_CHECKER(schema)) {
      schemaValue = "(" + schema + ")";
    }

    con.query(
      "INSERT INTO " + tableName + schemaValue + " VALUES (" + value + ");",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * deletes a tuple from a table
 *
 * @param {string} tableName The name of the table to delete from
 * @param {[string]} attributes The attribute part
 * @param {[string]} values The value part
 * @returns {queryInfo, queryError} - values for debugging
 */
function DELETE_FROM(tableName, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    con.query(
      "DELETE FROM " + tableName + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * updates a tuple of a table in the database
 * 
 * @param {string} tableName the name of the table
 * @param {[string]} setAttributes the attributes to update
 * @param {[string]} setValues the value to update
 * @param {[string]} attributes the attribute part of where to update
 * @param {[string]} values the value part of where to update
 * @returns {queryInfo, queryError} - values for debugging
 */
function UPDATE_TUPLE(tableName, setAttributes, setValues, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    var setValue = "";

    for (var i = 0; i < setValues.length; i++) {
      if (DATA_CHECKER(setValues[i])) {
        setValue += setAttributes[i] + " = " + "'" + setValues[i] + "'";

        if (i != setValues.length - 1) {
          setValue += ", ";
        }
      }
    }

    con.query(
      "UPDATE " + tableName + " SET " + setValue + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * increases a tuple of a table in the database
 * 
 * @param {string} tableName the name of the table
 * @param {[string]} setAttributes the attributes to increase
 * @param {[string]} setValues the value to increase
 * @param {[string]} attributes the attribute part of where to increase
 * @param {[string]} values the value part of where to increase
 * @returns {queryInfo, queryError} - values for debugging
 */
function INCREASE(tableName, setAttributes, setValues, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    var setValue = "";

    for (var i = 0; i < setValues.length; i++) {
      if (DATA_CHECKER(setValues[i])) {
        setValue += setAttributes[i] + " = " + setAttributes[i] + " + " + setValues[i] + "";

        if (i != setValues.length - 1) {
          setValue += ", ";
        }
      }
    }

    con.query(
      "UPDATE " + tableName + " SET " + setValue + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * decreases a tuple of a table in the database
 * 
 * @param {string} tableName the name of the table
 * @param {[string]} setAttributes the attributes to decrease
 * @param {[string]} setValues the value to decrease
 * @param {[string]} attributes the attribute part of where to decrease
 * @param {[string]} values the value part of where to decrease
 * @returns {queryInfo, queryError} - values for debugging
 */
function DECREASE(tableName, setAttributes, setValues, attributes, values) {
  return new Promise((resolve, reject) => {
    var value = "";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        value += attributes[i] + " = " + "'" + values[i] + "'";

        if (i != values.length - 1) {
          value += " AND ";
        }
      }
    }

    var setValue = "";

    for (var i = 0; i < setValues.length; i++) {
      if (DATA_CHECKER(setValues[i])) {
        setValue += setAttributes[i] + " = " + setAttributes[i] + " - " + setValues[i] + "";

        if (i != setValues.length - 1) {
          setValue += ", ";
        }
      }
    }

    con.query(
      "UPDATE " + tableName + " SET " + setValue + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * selects a tuple of a table based on the value of the attribute and order the result
 * 
 * @param {[string]} tableName - the name of the table
 * @param {[string]} attributes - the attributes part
 * @param {[string]} values - the values part
 * @param {[string]} orderAttribute - the attribute based on to order the result
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info, queryInfo, queryError} - the information of the table
 */
function SELECT_SEARCH(tableName, attributes, values, orderAttribute) {
  return new Promise((resolve, reject) => {
    var value = "(";

    for (var i = 0; i < values.length; i++) {
      if (DATA_CHECKER(values[i])) {
        for(var j = 0; j < attributes.length; j++){
          value += "LOWER(" + attributes[j] + ") LIKE " + "'%" + values[i].toLowerCase() + "%'";
          
          if (j != attributes.length - 1) {
            value += " OR ";
          }
        }
        if(i != values.length - 1){
          value += ") AND (";
        }
      }
    }
    value += ")";

    var valueOfTableName = '';
    for (var i = 0; i < tableName.length; i++){
      if(DATA_CHECKER(tableName[i])){
        valueOfTableName += tableName[i];
      }

      if(i != tableName.length - 1){
        valueOfTableName += " NATURAL JOIN ";
      }
    }

    if (DATA_CHECKER(orderAttribute)){
      value += " ORDER BY " + orderAttribute + " DESC";
    }

    con.query(
      "SELECT * FROM " + valueOfTableName + " WHERE " + value + ";",
      (err, result, fields) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({ info: result, queryInfo: 1, queryError: 0 });
        }
      }
    );
  });
}

/**
 * gets name of the table
 * 
 * @returns {info} - Name of the table 
 */
function GET_TABLE_NAME() {
  return new Promise ((resolve, reject) => {
    con.query(
      "SELECT TABLE_NAME as tableName FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = 'mmsdb'",
      (err, result, field) => {

      if(err){
        console.log(err);
      } else {
        resolve({info: result});
        }
      }
    );
  });
}

/**
 * gets the default value of the chosen table
 * 
 * @param {string} tableName - Name of the table
 * @returns {queryInfo, queryError} - if there is error happens
 * @returns {info} - the default value
 *  
 */
function GET_DEFAULT_VALUE(tableName) {

  return new Promise ((resolve, reject) => {
    con.query(
      "SELECT COLUMN_NAME as columnName, COLUMN_DEFAULT as columnDefault FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'mmsdb' AND TABLE_NAME = '" + tableName + "';",
      (err, result, field) => {

        if (err) {
          console.log(err);
          resolve({ queryInfo: 0, queryError: 1 });
        } else {
          resolve({info: result})
        }
      }
    )
  })
}

/**
 * gets the date, month and year after the input days
 * 
 * @param {Number} day - the gap between the current day and the day want to take
 * @returns {res} - the year-month-day 
 */
function GET_DATE(day) {

  var currentDate = new Date();
  var date_ob = new Date();

  currentDate.setDate(date_ob.getDate() + day);

  let date = ("0" + currentDate.getDate()).slice(-2);

  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);

  let year = currentDate.getFullYear();

  var res = year + "-" + month + "-" + date;

  return res;
}

/**
 * gets the current time
 * 
 * @returns time
 */
  function GET_TIME() {

  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });

  return formatter.format(now);
}

module.exports = {
  GENERATE_RANDOM_CODE,
  CHECK_EXIST,
  SELECT,
  LENGTH_CHECKER,
  SELECT_TABLE,
  SELECT_V2,
  DESCRIBE,
  INSERT_INTO,
  DELETE_FROM,
  UPDATE_TUPLE,
  INCREASE,
  DECREASE,
  SELECT_SEARCH,
  GET_TABLE_NAME,
  GET_DEFAULT_VALUE,
  GET_DATE,
  GET_TIME
};
