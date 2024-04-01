class User {
  constructor(
    id,
    employeeCode,
    age,
    createdDate,
    avatarFileData,
    avatarFileName
  ) {
    this._id = id;
    this._employeeCode = employeeCode;
    this._age = age;
    this._createdDate = createdDate;
    this._avatarFileData = avatarFileData;
    this._avatarFileName = avatarFileName;
  }

  // Getter and setter for id
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  // Getter and setter for employeeCode
  get employeeCode() {
    return this._employeeCode;
  }

  set employeeCode(employeeCode) {
    this._employeeCode = employeeCode;
  }

  // Getter and setter for age
  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
  }

  // Getter and setter for createdDate
  get createdDate() {
    return this._createdDate;
  }

  set createdDate(createdDate) {
    this._createdDate = createdDate;
  }
  get avatarFileData() {
    return this._avatarFileData;
  }

  set avatarFileData(avatarFileData) {
    this._avatarFileData = avatarFileData;
  }
  get avatarFileName() {
    return this._avatarFileName;
  }

  set avatarFileName(avatarFileName) {
    this._avatarFileName = avatarFileName;
  }

  toJSON() {
    return {
      id: this._id,
      employeeCode: this._employeeCode,
      age: this._age,
      createdDate: this._createdDate,
      avatarFileData: this._avatarFileData,
      avatarFileName: this._avatarFileName,
    };
  }
}

module.exports = User;
