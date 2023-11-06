export const numberToPrice = (val) => {
    try {
        if (val >= 1000) {
            const res = (val / 1000).toFixed(0)
            return res + 'K'
        } else {
            return val.toString()
        }
    } catch (error) {
        throw error
    }
}