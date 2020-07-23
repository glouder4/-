const readline = require('readline');
const officegen = require('officegen')
const fs = require('fs')

var readLine = readline.createInterface({
    input: fs.createReadStream("hello.txt"),
    output: process.stdout,
    terminal: false
});
let numberLine = 0;
readLine.on('line', function (line) {
    console.log(line,numberLine) // print the content of the line on each linebreak
    numberLine++;
});
 
/*// Create an empty Word object:
let docx = officegen('docx')
 
// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', function(written) {
  console.log(
    'Finish to create a Microsoft Word document.'
  )
})
 
// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
}) 
 
pObj = docx.createP()
 
pObj.addText('Those two lines are in the same paragraph,', { font_face: 'Arial', font_size: 10 })
pObj.addLineBreak()
pObj.addText('but they are separated by a line break.')
 
docx.putPageBreak()
 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream('example.docx')
 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)*/