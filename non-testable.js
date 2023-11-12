const value = 100;
const action = () => {
    console.log(value);
}

// not exported, how we gonna write tests about it
// creating a closure, if we export the function what about value?