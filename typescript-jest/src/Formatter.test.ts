import { Formatter } from "./Formatter";




describe('Formatter', () => {
    it('Max length of each Column with padding', () => {
        let formatter = new Formatter();

        const data = [
            ['Date', '2021-12-02'],
            ['Amount', '+500'],
            ['Balance', '500'],
        ]

        const expectedResult = [ 10, 8, 9 ]
        const result = formatter.columnLength(data)

        expect(result).toEqual(expectedResult);
    })

    it('Display the header of the result', () => {
        let formatter = new Formatter();

        const data = [
            ['Date', '2021-12-02'],
            ['Amount', '+500'],
            ['Balance', '500'],
        ]

        const expectedResult = "Date        Amount  Balance"
        const result = formatter.format(data)

        expect(result).toBe(expectedResult)
    })

    it('Formats array to formatted string', () => {
        let formatter = new Formatter();

        const data = [
            ['Date', '2021-12-02'],
            ['Amount', '+500'],
            ['Balance', '500'],
        ]
        const expectedResult = 
                'Date        Amount  Balance\n' +
                '2021-12-02   +500      500 \n'
        const result = formatter.format(data)

        expect(result).toBe(expectedResult)
    })
})