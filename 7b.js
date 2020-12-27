// Import the filesystem module 
const fs = require("fs"); 
  
//let directory_name = "exampleDir"; 
let directory_name = process.argv[2];  

console.log("directory_name = " + directory_name);

// Open the directory 
let openedDir = fs.opendirSync(directory_name); 
  
// Print the pathname of the directory 
console.log("\nPath of the directory:", openedDir.path); 
  
// Get the files present in the directory 
console.log("Files Present in directory:"); 
  
let filesLeft = true; 
while (filesLeft) { 
  // Read a file as fs.Dirent object 
  let fileDirent = openedDir.readSync(); 
  
  // If readSync() does not return null 
  // print its filename 
  if (fileDirent != null) {
    console.log("Name:", fileDirent.name); 

    var fileName = directory_name + "/" + fileDirent.name;

    console.log("fileName = " + fileName);

    fs.watch(fileName, (eventType, fileName) => { 
        console.log("\nThe file", fileName, "was modified!"); 
        console.log("The type of change was:", eventType); 

        fs.readFile('/etc/hosts', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log("changed file contents: ");
            console.log(data);
          });
      }); 
    }
  // If the readSync() returns null 
  // stop the loop 
  else filesLeft = false; 
} 