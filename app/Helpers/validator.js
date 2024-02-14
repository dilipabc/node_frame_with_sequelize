/****************************************************
# validator     
# Page/Class name : validator
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : unique, uniqueeWithoutThisValue, inDatabase, inDatabaseInput, uniqueWithout, chkUrlFormate, fileType, timeFormate, caseSensitive, dateTimeFormate
# Purpose : This is a custom validator class build with extends of node-input-validator class.
*****************************************************/
//==================================================================

const Validator = require('node-input-validator');

//==================================================================
Validator.messages({
    unique: 'The :attribute has already been taken.',
    uniqueWithout: 'The :attribute has already been taken.',
    inDatabase: `The :attribute doesn't exist in our record.`,
    inDatabaseInput: `The :attribute doesn't exist in our record.`,
    minLength: 'The :attribute can not be less than :arg0.',
    chkUrlFormate: 'The :attribute url not acceptable.',
    fileType: 'The :attribute file type is not acceptable.',
    timeFormate: 'The :attribute time formate is not acceptable.',
    caseSensitive: 'Only uppercase allowed in :attribute.',
    dateTimeFormate: 'Accept only YYYY-MM-DD H:i:s in :attribute.',
    array: 'The :attribute must be an array.',

});
//==================================================================
Validator.extend('chkUrlFormate', async function (coloum, value, args) {
    const Url = require("url");
    let application = Config('application');
    let result = Url.parse(value);

    return (application.match_hostname.indexOf(result.hostname) > -1);
});
//==================================================================
Validator.extend('fileType', async function (coloum, value, args) {
    if (!value) {
        return false;
    }

    let fileExtension = _.last(_.split(value, '.'));

    return _.contain(args, fileExtension);
});
//==================================================================
Validator.extend('timeFormate', async function (coloum, value, args) {

    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
    if (isValid) {
        return true;
    } else {
        return false;
    }
});
//==================================================================
Validator.extend('caseSensitive', async function (coloum, value, args) {

    var string = value;
    var stringCheck = string.toUpperCase() == string;

    if (stringCheck === true) {
        return true;
    }
    else {
        return false;
    }

});
//==================================================================
Validator.extend('dateTimeFormate', async function (coloum, value, args) {

    if (!value.match(/^[0-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9] [0-2][0-9]\:[0-6][0-9]\:[0-6][0-9]$/)) {
        return false;
    }
    else {
        return true;
    }
});
//==================================================================
module.exports = Validator;

//==================================================================