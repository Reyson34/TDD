
export class Formatter {

    // ['Date', '2021-12-02'],
    // ['Amount', '+500'],
    // ['Balance', '500'],

    // 'Date       Amount  Balance\n' +
    // '2021-12-02   +500      500\n'

    format = (arr) => {
        const res = []

        arr.forEach((row, index) => {
            var size = 0
            row.forEach(string => {
                size = Math.max(size, string.length)
            })

            res[index] = []           
            row.forEach((string, key) => {
                res[index][key] = string.padEnd(size + 2)
            })
        })

        var result = ''
        for (var i = 0; i < res[0].length; i++) {
            res.forEach(row => {
                result += row[i]
            })
            result += '\n'
        }

        return result 
    }
}

