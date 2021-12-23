import { Formatter } from "./Formatter";

describe('Formatter', () => {
    it('Formats array to formatted string', () => {
        let formatter = new Formatter();

        const result = formatter.format([
            ['Date', '2021-12-02'],
            ['Amount', '+500'],
            ['Balance', '500'],
        ])

        expect(result).toBe(
            'Date        Amount  Balance\n' +
            '2021-12-02   +500      500\n'
        )
    })
})