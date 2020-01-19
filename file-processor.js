const hasFilePath = opts => (typeof opts[0] === "undefined" ? null : opts[0]);
const hasStartDate = opts => (typeof opts[1] === "undefined" ? null : opts[0]);
const hasProjectId = opts => (typeof opts[2] === "undefined" ? null : opts[0]);

const FileProcessor = function() {};

FileProcessor.prototype.configure = function(...options) {
  var opts = options || {};

  // Public properties
  this.filePath = hasFilePath(opts);
  this.startDate = hasStartDate(opts);
  this.projectId = hasProjectId(opts);

  this._isValid = true;
};

FileProcessor.prototype.isValid = function() {
  const fileSystem = require("fs");
  const filename = this.filePath;
  let returnValue = true;
  fileSystem.exists(filename, exists => {
    console.log("exists result: ", exists);
    if (!exists) {
      returnValue = false;
    }
  });
  return returnValue;
};

FileProcessor.prototype.readFile = function() {
  const fileSystem = require("fs");
  const filename = this.filePath;
  fileSystem.readFile(filename, "utf8", function(error, data) {
    if (error) {
      throw error;
    }
    // console.log("OK: " + filename);
    // console.log(data);
    console.log(data[0]);
  });
};

module.exports.processFile = function(...args) {
  // Main instance
  var fileProcessorInstance = new FileProcessor();

  // Constructor
  function fileProcessorFn(...args) {
    return fileProcessor.apply(fileProcessorInstance, args);
  }

  // Binders
  fileProcessorFn.configure = fileProcessorInstance.configure.bind(
    fileProcessorInstance
  );
  fileProcessorFn.readFile = fileProcessorInstance.readFile.bind(
    fileProcessorInstance
  );
  fileProcessorFn.isValid = fileProcessorInstance.isValid.bind(
    fileProcessorInstance
  );

  // Property accessors
  Object.defineProperty(fileProcessorFn, "filePath", {
    get: function() {
      return fileProcessorInstance.filePath;
    },
    set: function(filePath) {
      fileProcessorInstance.filePath = filePath;
    }
  });
  Object.defineProperty(fileProcessorFn, "startDate", {
    get: function() {
      return fileProcessorInstance.startDate;
    },
    set: function(startDate) {
      fileProcessorInstance.startDate = startDate;
    }
  });
  Object.defineProperty(fileProcessorFn, "projectId", {
    get: function() {
      return fileProcessorInstance.projectId;
    },
    set: function(projectId) {
      fileProcessorInstance.projectId = projectId;
    }
  });

  return fileProcessorFn;
};
