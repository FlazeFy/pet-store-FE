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

export const ucFirstChar = (val) => {
    try {
        return val.charAt(0).toUpperCase() + val.slice(1)
    } catch (error) {
        throw error
    }
}

export const ucFirstWord = (val) => {
    try {
        const words = val.split(' ')
        const caps = words.map(wd => {
            return wd.charAt(0).toUpperCase() + wd.slice(1)
        });
        const res = caps.join(' ')

        return res
    } catch (error) {
        throw error
    }
}

export const convertDatetime = (val, type) => {
    try {
        if(val){
            const result = new Date(val)
    
            if (type == "full") {
                const now = new Date(Date.now())
                const yesterday = new Date()
                const tomorrow = new Date()
                yesterday.setDate(yesterday.getDate() - 1)
                tomorrow.setDate(tomorrow.getDate() + 1)
                
                if (result.toDateString() === now.toDateString()) {
                    return ` ${messages('today_at')} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else if (result.toDateString() === yesterday.toDateString()) {
                    return ` ${messages('yesterday_at')} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else if (result.toDateString() === tomorrow.toDateString()) {
                    return ` ${messages('tommorow_at')} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                } else {
                    return ` ${result.getFullYear()}/${(result.getMonth() + 1)}/${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
                }
            } else if (type == "24h" || type == "12h") {
                return `${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`;
            } else if (type == "datetime") {
                return ` ${result.getFullYear()}/${(result.getMonth() + 1)}/${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
            } else if (type == "date") {
                return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)}`
            } else if (type == "calendar") {
                const result = new Date(val)
                const offsetHours = getUTCHourOffset()
                result.setUTCHours(result.getUTCHours() + offsetHours)
            
                return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}:00`
            }        
        } else {
            return "-"
        }
    } catch (error) {
        throw error
    }
}

export const getUTCHourOffset = (val, type) => {
    try {
        const offsetMi = new Date().getTimezoneOffset()
        const res = -offsetMi / 60
        return res
    } catch (error) {
        throw error
    }
}