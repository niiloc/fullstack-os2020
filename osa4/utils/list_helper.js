const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let initialValue = 0
    const sum = blogs.reduce((accumulator, currentValue) => {
       return accumulator + currentValue.likes
    }, initialValue
    )

    return sum
}

const getFavorite = (blogs) => {
    let initialValue = 0
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }, initialValue)

    return favorite
}
  
module.exports = {
    dummy,
    totalLikes,
    getFavorite,
  }