// Global scope definitions
var { printMessage, printErrorMessage } = require("./custom-output.js");

function processFile(dataToBeProcessedObject) {
  /* Use relationship only method using it, (refactor) in case that another method
   * needs to know information like the processing status this should be moved to globals */
  try {
    var { processFile } = require("./file-processor.js");
    const processFileHandler = processFile();
    processFileHandler.configure(
      dataToBeProcessedObject.File,
      dataToBeProcessedObject.SortByStartDate,
      dataToBeProcessedObject.Project
    );
    console.log("isValid(): ", processFileHandler.isValid());
    if (processFileHandler.isValid()) {
      const readedFile = processFileHandler.readFile();
      console.log("done.");
    } else {
      printErrorMessage(
        "Some validations have failed while your file was being processed, please verify your file and try again",
        0
      );
      return 0;
    }
  } catch (error) {
    printErrorMessage("Error processing file.", 2);
    throw error;
  }
  return 1;
}

/*
 * Component Name: validateRequest Function
 * Author: Jonnathan Guarate
 * Description: Handles the validation logic for the entered terminal comands.
 * Default: Output (String) message in case that the command is not found
 * Throws: Nothing
 */
function validateRequest(program) {
  if (program.File) {
    return 1;
  }
  if (program.SortByStartDate) {
    printMessage(
      "Request could not be processed. Reason: %s command is mandatory, please format your request and try again",
      "--File"
    );
    return 0;
  }
  if (program.Project) {
    printMessage(
      "Request could not be processed. Reason: --File command is mandatory, please format you request and try again"
    );
    return 0;
  }
  // Default Invalid option
  printErrorMessage(
    "Command not found. Please enter %s or %s to view available options",
    1,
    "-h",
    "--help"
  );
  return 0;
}

/*
 * Component Name: Run Function
 * Author: Jonnathan Guarate
 * Description: Start processing the request validate and call the processing method.
 * Default: return 1 or true
 * Throws: Error in case of any unexpected result
 */
function run(program) {
  try {
    if (validateRequest(program)) {
      // Send only required information not the whole bunch of data
      const fileProcessorRequireData = (({
        File,
        SortByStartDate,
        Project
      }) => ({
        File,
        SortByStartDate,
        Project
      }))(program.opts());
      processFile(fileProcessorRequireData);
    }
  } catch (error) {
    printErrorMessage("Unexpected Error", 2);
    throw error;
  }
}

/*
 * Component Name: Command Line Application entry point
 * Author: Jonnathan Guarate
 * Description: Entry point to start processing the commands send by the terminal.
 * Default: returns 1 or true
 * Throws: Nothing
 */
function main() {
  const program = require("commander");
  program
    .version("0.0.1")
    .option("-F, --File [path]", "full path to the input file")
    .option(
      "-S, --SortByStartDate [date]",
      'sort results by column "Start date" in ascending order'
    )
    .option("-P, --Project [project_id]", 'filter results by column "Project"')
    .allowUnknownOption()
    .parse(process.argv);
  run(program);
  return 1;
}

main();
