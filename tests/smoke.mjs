import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
const context = {window:{}};
runInNewContext(readFileSync('curriculum.js','utf8'), context);
runInNewContext(readFileSync('quiz-bank.js','utf8'),context);
const modules = context.window.MODULES;
const bank = context.window.QUESTION_BANK;
assert.equal(modules.length,10,'Course must have exactly ten modules');
assert.equal(Object.keys(bank).length,10,'One question bank per module');
let total = 0;
for (const module of modules) {
 assert.equal(module.lessons.length,3,module.id + ': needs 3 lessons');
 assert.ok(module.outcome && module.lab,module.id + ': learning outcome/lab required');
 const questions=bank[module.id];
 assert.equal(questions?.length,50,module.id + ': requires 50 candidates');
 const ids = new Set();
 for (const q of questions) {
  assert.ok(!ids.has(q.id),'Repeated question ID');
  ids.add(q.id);
  assert.equal(q.options.length,4,module.id + ': must have four options');
  assert.equal(new Set(q.options).size,4,module.id + ': answer options must be distinct');
  assert.ok(q.options.includes(q.answer),module.id + ': missing correct answer');
  assert.ok(q.why.length>12,'Explanation required');
 }
 total += questions.length;
}
assert.equal(total,500);
const html=readFileSync('index.html','utf8'),workbook=readFileSync('workbook.html','utf8');
for(const asset of ['styles.css','curriculum.js','quiz-bank.js','app.js']) assert.ok(html.includes(asset),'Missing '+asset+' from index');
assert.ok(workbook.includes('window.print()'),'Workbook printable');
console.log('PASS: 10 modules, 30 lessons, 10 labs, 500 quiz candidates, 4 distinct answers/question, printable workbook');