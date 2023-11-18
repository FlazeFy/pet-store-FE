export const htmlDecode = (val) => {
    try {
        const prs = new DOMParser()
        const res = prs.parseFromString(val, 'text/html')
        return res.body.textContent
    } catch (error) {
        throw error
    }
}

export const parseJSON = (val) => {
    try {
        const res = JSON.parse(val)
        return res
    } catch (error) {
        throw error
    }
}