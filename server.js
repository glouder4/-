const readline = require('readline');
const officegen = require('officegen')
const fs = require('fs')

let docx = officegen('docx')

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
} 

pObj = docx.createP();

var readLine = readline.createInterface({
    input: fs.createReadStream("hello.txt"),
    output: process.stdout,
    terminal: false
});
let stringBuffer = [];
let questionAnswerExamples = [];  let questionGotRightAnswerLine = '!';
function makeTest(){
	return new Promise(function (resolve,reject) {
		readLine.on('line', function (line) {	
			stringBuffer.push(line);
		}).on('close', function(){
			let lineCount = 0;
			function getLine(){
				let item = stringBuffer[lineCount];
				if( (item.includes('.',0))&&(isNaN ( item.split('.')[0]) == false) ){
					if( questionGotRightAnswerLine != '!'){											
						let lineNumberWhichNeedSwap = randomInteger(0, questionAnswerExamples.length-1);
						let answerNumberSwap = questionAnswerExamples[questionGotRightAnswerLine].split('')[0];
						let AnswerLine = (questionAnswerExamples[questionGotRightAnswerLine]).split('').slice(1,(questionAnswerExamples[questionGotRightAnswerLine]).split('').length).join('');
						let newAnswerLine = questionAnswerExamples[lineNumberWhichNeedSwap].split('')[0] + AnswerLine;	
						questionAnswerExamples[questionGotRightAnswerLine] = newAnswerLine;

						let secondAnswerLine = (questionAnswerExamples[lineNumberWhichNeedSwap]).split('').slice(1,(questionAnswerExamples[lineNumberWhichNeedSwap]).split('').length).join('');
						let secondNewAnswerLine = answerNumberSwap + secondAnswerLine;	
						questionAnswerExamples[lineNumberWhichNeedSwap] = secondNewAnswerLine;

						[ questionAnswerExamples[questionGotRightAnswerLine], questionAnswerExamples[lineNumberWhichNeedSwap] ]  = [ questionAnswerExamples[lineNumberWhichNeedSwap], questionAnswerExamples[questionGotRightAnswerLine] ];
						questionAnswerExamples.forEach(function(QuestionItem, j, questionAnswerExamples) {
							pObj.addText(QuestionItem, { font_face: 'Arial', font_size: 10 });
							pObj.addLineBreak();
						});				
						questionAnswerExamples = [];
						questionGotRightAnswerLine = '!';				
					}
					pObj.addText(item, { font_face: 'Arial', font_size: 10 });
					pObj.addLineBreak();				
				}
				else if( (item.includes(')',0))&&( isNaN ( item.split(')')[0])  == false ) ){
					if(item.includes('~',0)){
						item = ((item).split('').slice(0,(item).split('').length-1)).join('');
						questionGotRightAnswerLine = questionAnswerExamples.length;
						questionAnswerExamples.push(item);
					}
					else{
						questionAnswerExamples.push(item);
					}					
				}
				else{
					pObj.addText(item, { font_face: 'Arial', font_size: 10 });
					pObj.addLineBreak();
				}				
				if(lineCount == stringBuffer.length-1) resolve();
				else{
					lineCount++;
					getLine();
				}
			}	
			getLine();	
		});
	})
}
makeTest().then(function(){
	readLine.close();
    docx.on('finalize', function(written) {
	  console.log(
	    'Finish to create a Microsoft Word document.'
	  )
	})
	// Officegen calling this function to report errors:
	docx.on('error', function(err) {
	  console.log(err)
	})
	// Let's generate the Word document into a file:
	 
	let out = fs.createWriteStream('example.docx')
	 
	out.on('error', function(err) {
	  console.log(err)
	})
	 
	// Async call to generate the output file:
	docx.generate(out);  
})
 
/* 
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