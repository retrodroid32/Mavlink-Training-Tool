import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source={
 app:fs.readFileSync('app.js','utf8'),
 curriculum:fs.readFileSync('curriculum.js','utf8'),
 bank:fs.readFileSync('quiz-bank.js','utf8')
};
function start(hash){
 const window={addEventListener(){},scrollTo(){},crypto:{getRandomValues(arr){arr[0]=Math.floor(Math.random()*4294967296);}}};
 const listeners={};const elements={};
 const document={getElementById(id){return elements[id] ||= {innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){}};},addEventListener(name,cb){listeners[name]=cb;}};
 const location={hash};
 const localStorage={getItem(){return null;},setItem(){}};
 const context=vm.createContext({window,document,location,localStorage,confirm:()=>true,console});
 vm.runInContext(source.curriculum,context);
 vm.runInContext(source.bank,context);
 const instrumented=source.app.replace(/\}\)\(\);\s*$/, 'window.__test={quizSession,progress,packetBuild,labs,parseBytes};})();');
 vm.runInContext(instrumented,context);
 return {window,elements,listeners};
}
for(const m of ['fundamentals','identity','packet','payload','messages','streams','commands','missions','security','diagnostics']){
 const {elements}=start('#module/'+m+'/3');
 assert.ok(elements.appMain.innerHTML.includes('HANDS-ON LAB'),m+': lab failed to render');
}
assert.ok(start('#home').elements.appMain.innerHTML.includes('Make sense'));
assert.ok(start('#glossary').elements.appMain.innerHTML.includes('Protocol glossary'));
const {window,listeners}=start('#quiz/packet');
const t=window.__test;
assert.equal(t.quizSession.packet.items.length,5);
assert.equal(new Set(t.quizSession.packet.items.map(q=>q.concept)).size,5);
for(let i=0;i<5;i++){
 const q=t.quizSession.packet;
 const correct=q.items[q.index].options.indexOf(q.items[q.index].answer);
 const click=dataset=>listeners.click({preventDefault(){},target:{closest(){return {dataset};}}});
 click({action:'quizSelect',index:String(correct)});
 click({action:'quizNext'});
}
assert.equal(t.progress.packet.best,5);
assert.equal(t.quizSession.packet.finished,true);
assert.deepEqual(Array.from(t.parseBytes('34 12')),[0x34,0x12]);
for(const msg of ['HEARTBEAT','GLOBAL_POSITION_INT','COMMAND_LONG']){
 t.labs.packet.msg=msg;t.labs.packet.corrupt=false;
 const p=t.packetBuild();
 assert.equal(p.good,true,msg+' CRC should verify');
 const extra={HEARTBEAT:50,GLOBAL_POSITION_INT:104,COMMAND_LONG:152}[msg];
 let x=0xffff;
 for(const b of [...p.bytes.slice(1,-2),extra]){
  x ^= b;
  for(let j=0;j<8;j++) x=(x&1)?((x>>1)^0x8408):x>>1;
 }
 const sent=p.bytes.at(-2)|(p.bytes.at(-1)<<8);
 assert.equal(x,sent,msg+' independent CRC mismatch');
 t.labs.packet.corrupt=true;
 assert.equal(t.packetBuild().good,false,msg+' modified payload should fail CRC');
 t.labs.packet.corrupt=false;
}
const workbook=fs.readFileSync('workbook.html','utf8');
const match=workbook.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Workbook JavaScript missing');
const contents={};
const document={getElementById(id){return contents[id] ||= {innerHTML:''};}};
const context=vm.createContext({MODULES:window.MODULES,document});
vm.runInContext(match[1],context);
assert.equal((contents.toc.innerHTML.match(/toc-item/g)||[]).length,10);
assert.equal((contents.answerList.innerHTML.match(/class="answer"/g)||[]).length,10);
console.log('PASS: ten labs, navigation, quiz completion, real CRCs, deliberate CRC failures and workbook rendering');