

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 10000, 'foo');
});


console.log("going late")

Promise.all([promise3, promise2, promise3])
    .then((values) => {
        console.log(values);
        return Promise.all([promise1, promise2, promise1])
            .then((values) => {
                console.log(values);
            });
    })
    .then(value => {
        console.log(value);
        console.log("Not retruning");
    });

console.log("early")

Promise.all([promise1, promise2, promise1])
    .then((values) => {
        console.log(values);
    });
