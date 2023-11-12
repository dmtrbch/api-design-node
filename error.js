setTimeout(() => {
    throw new Error('oops')
}, 300)

process.on('uncaughtException', () => {

})

process.on('unhadledRejection', () => {
    
})

// error handling outside of Express, in case something
// brake but in Node