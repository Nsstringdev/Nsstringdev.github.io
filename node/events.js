const EventEmitter = require('events');
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1.
celebrity.on('race', (result) => {
    if (result === 'win'){
        console.log('Congratulations! You are the best!');
    }
});

// Subscribe to celebrity for Observer 2. 
celebrity.on('race', (result) => {
    if (result === 'win'){
        console.log('Boo I could have better than that!');
    }
});

celebrity.emit('race', 'win');