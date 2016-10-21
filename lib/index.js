

var esprima = require('esprima');
var escodegen = require('escodegen');
var fs = require('fs');


var data = fs.readFileSync('google-steps.js', 'utf-8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

var lines = data.split("\n");
var assertions = {};
lines.forEach((line, line_number) => {
  if (line.indexOf('assert(') !== -1 || line.indexOf('expect(') !== -1) {
    lines[line_number] = ` ******* ${line}`;
    assertions[line_number] = line;
  }
});

data = lines.join("\n");

console.log(data);
/*
for (var index in assertions) {
  let assert_object = esprima.parse(assertions[index]);
  console.log(JSON.stringify(assert_object, null, 2));
  console.log(escodegen.generate(assert_object));
}
*/
//console.log(esprima.tokenize(ass));



