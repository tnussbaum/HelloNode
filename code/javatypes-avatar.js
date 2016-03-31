var Collections = Java.type('java.util.Collections');
var ArrayList = Java.type('java.util.ArrayList');

var dwarves = new ArrayList();
dwarves.add('Happy');
dwarves.add('Sleepy');
dwarves.add('Grumpy');
dwarves.add('Dopey');
dwarves.add('Sneezy');
dwarves.add('Bashful');
dwarves.add('Doc');

console.log('Before: ' + dwarves);

Collections.sort(dwarves);

console.log('Sorted: ' + dwarves);
