'use strict';
/* All questions are generated locally; no code evaluation and no API required.
   Grade bands are approximate teacher guidance, not a formal standards assessment. */
window.MATHDROP=(function(){
 const TOPICS=[['mixed','Mixed practice',1],['addition','Addition',1],['subtraction','Subtraction',1],['multiplication','Multiplication',2],['division','Division',3],['fractions','Fractions',3],['decimals','Decimals',4],['geometry','Geometry',4],['percent','Percents & ratios',5],['integers','Integers',6],['exponents','Exponents',6],['algebra','Algebra',7]];
 const R=(lo,hi)=>Math.floor(Math.random()*(hi-lo+1))+lo;
 const pick=a=>a[R(0,a.length-1)];
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 function textValue(x){return Number.isInteger(x)?String(x):String(Number(x.toFixed(5)));}
 function numeric(input){const s=String(input||'').trim().replace(/−/g,'-').replace(/,/g,'').replace(/%$/,'');if(!s||!/^[-+]?\d+(?:\.\d+)?(?:\s*\/\s*[-+]?\d+(?:\.\d+)?)?$/.test(s))return null;const bits=s.split('/');const n=Number(bits[0]),d=bits.length===2?Number(bits[1]):1;if(!Number.isFinite(n)||!Number.isFinite(d)||d===0)return null;return n/d}
 function F(question,answer,hint,topic,explanation=''){return {question:String(question),answer:Number(answer),hint:String(hint),topic,explanation:String(explanation),display:textValue(Number(answer))}}
 function make(grade,selected){
  let topic=selected;
  if(!TOPICS.some(t=>t[0]===topic&&t[2]<=grade))topic='mixed';
  if(topic==='mixed'){const valid=TOPICS.filter(t=>t[0]!=='mixed'&&t[2]<=grade);const weights=valid.flatMap(t=>t[0]==='addition'||t[0]==='subtraction'?[t[0],t[0]]:[t[0]]);topic=pick(weights)}
  let a,b,ans,k,n,d;
  switch(topic){
   case 'addition':{let max=grade===1?12:grade===2?60:grade<=4?400:grade<=6?1200:2500;a=R(1,max);b=R(1,max);return F(`${a} + ${b} = ?`,a+b,'Add ones first, then tens and larger place values.',topic)}
   case 'subtraction':{let max=grade===1?18:grade===2?80:grade<=4?400:1200;a=R(1,max);b=R(1,max);if(grade<6&&b>a)[a,b]=[b,a];return F(`${a} − ${b} = ?`,a-b,'Check the difference by adding it back.',topic)}
   case 'multiplication':{let max=grade<=3?10:grade<=6?12:grade<=9?16:24;a=R(2,max);b=R(2,max);return F(`${a} × ${b} = ?`,a*b,'Use repeated groups or known multiplication facts.',topic)}
   case 'division':{let max=grade<=4?12:grade<=7?18:grade<=10?24:32;a=R(2,max);b=R(2,max);return F(`${a*b} ÷ ${b} = ?`,a,'What number times the divisor gives the dividend?',topic)}
   case 'fractions':{d=pick(grade<=4?[2,3,4,6,8]:[2,3,4,5,6,8,10,12]);let d2=d;a=R(1,d-1);b=R(1,d-1);const sign=pick(['+','−']);if(sign==='−'&&a<b)[a,b]=[b,a];n=sign==='+'?a+b:a-b;const reduced=gcd(n,d);return F(`${a}/${d} ${sign} ${b}/${d2} = ?`,n/d,'The denominators match. Combine the numerators and simplify if possible.',topic,`One exact answer is ${n/reduced}/${d/reduced}.`)}
   case 'decimals':{const denom=grade<=5?10:100;a=R(11,grade<=5?100:850);b=R(1,grade<=5?90:700);const subtract=R(0,1)===1;if(subtract&&grade<=5&&a<b)[a,b]=[b,a];const fmt=x=>(x/denom).toFixed(denom===10?1:2);return F(`${fmt(a)} ${subtract?'−':'+'} ${fmt(b)} = ?`,(subtract?a-b:a+b)/denom,'Align the decimal places before adding or subtracting.',topic)}
   case 'geometry':{a=R(3,grade<=5?12:28);b=R(3,grade<=5?12:25);const type=pick(['area','perimeter','triangle']);if(type==='triangle')return F(`Triangle: base ${a*2} cm, height ${b} cm. Area = ? (cm²)`,a*b,'Area of a triangle is half of base times height.',topic);if(type==='area')return F(`Rectangle: ${a} cm by ${b} cm. Area = ? (cm²)`,a*b,'Multiply length by width.',topic);return F(`Rectangle: ${a} cm by ${b} cm. Perimeter = ? (cm)`,2*(a+b),'A rectangle has two of each side length.',topic)}
   case 'percent':{a=pick([10,20,25,50,75]);b=R(2,grade<=6?12:30)*20;ans=a*b/100;return F(`What is ${a}% of ${b}?`,ans,'Convert the percent to a fraction or decimal, then multiply.',topic)}
   case 'integers':{a=R(-18,18);b=R(-18,18);const op=pick(['+','−']);return F(`${a} ${op} (${b}) = ?`,op==='+'?a+b:a-b,'Think about movement on a number line; subtracting a negative adds.',topic)}
   case 'exponents':{a=R(2,grade<=7?6:10);b=R(2,grade<=7?3:4);return F(`${a} ^ ${b} = ?`,a**b,'Exponent means multiply the base by itself that many times.',topic)}
   case 'algebra':{a=R(2,grade<=8?10:20);ans=R(-10,grade<=8?18:25);b=R(-15,15);const variant=R(0,2);if(variant===0)return F(`Solve for x: ${a}x = ${a*ans}`,ans,'Divide both sides by the coefficient of x.',topic);if(variant===1)return F(`Solve for x: x ${b>=0?'+':'−'} ${Math.abs(b)} = ${ans+b}`,ans,'Undo the constant by performing the inverse operation.',topic);return F(`Solve for x: ${a}x ${b>=0?'+':'−'} ${Math.abs(b)} = ${a*ans+b}`,ans,'Undo addition or subtraction first, then divide.',topic)}
   default:return F('7 + 5 = ?',12,'Count on from the larger number.','addition')
  }
 }
 function verify(problem,response){const v=numeric(response);return v!==null&&Math.abs(v-problem.answer)<=Math.max(1e-6,Math.abs(problem.answer)*1e-8)}
 return {TOPICS,make,verify,numeric};
})();
