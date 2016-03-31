var dwarves = new java.util.ArrayList();
dwarves.add('Happy');
dwarves.add('Sleepy');
dwarves.add('Grumpy');
dwarves.add('Dopey');
dwarves.add('Sneezy');
dwarves.add('Bashful');
dwarves.add('Doc');

console.log('Before: ' + dwarves);

java.util.Collections.sort(dwarves);

console.log('Sorted: ' + dwarves);
