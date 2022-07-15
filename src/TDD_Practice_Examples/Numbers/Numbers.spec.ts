import { sum } from "./Numbers"

describe("Numbers", () => {
    test("sum() should add two numbers", () => {
        expect(sum(1, 2)).toEqual(3);
    })
})