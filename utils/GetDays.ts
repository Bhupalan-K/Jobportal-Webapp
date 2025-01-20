const getDateDifference = (date: string) => {
    const postedDate = new Date(date)
    const currentDate = new Date()
    const msDay = 24 * 60 * 60 * 1000
    const differenceInDays = Math.floor((Number(currentDate) - Number(postedDate)) / msDay)

    if (differenceInDays <= 1) {
        return `${differenceInDays} Day Ago`
    } else {
        return `${differenceInDays} Days Ago`
    }
}

export default getDateDifference

