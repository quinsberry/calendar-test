import { assertNonNull, assertUnreachable, assertType, isOfType } from '../type-guards';


describe('isOfType', () => {
    it('applies the predicate', () => {
        let n: number = 0;
        let s: string = 'hello';

        const someFunction = (thing: number | string) => {
            if (isOfType<number>(thing, thing => typeof thing === 'number')) {
                // type is narrowed to number
                n = thing;
                // eslint-disable-next-line jest/no-conditional-expect
                expect(typeof n).toEqual('number');
            } else {
                // type is narrowed to string
                s = thing;
                // eslint-disable-next-line jest/no-conditional-expect
                expect(typeof s).toEqual('string');
            }
        };

        someFunction(17);
        expect(n).toEqual(17);

        someFunction('goodbye');
        expect(s).toEqual('goodbye');
    });
});


describe('assertType', () => {
    it('throws error if predicate fails', () => {
        let n: number = 0;

        const someFunction = (thing: number | string) => {
            assertType<number>(thing, thing => typeof thing === 'number');

            // type is narrowed to number
            n = thing;
        };

        someFunction(17);
        expect(n).toEqual(17);

        expect(() => someFunction('goodbye')).toThrow();
    });
    it('checks unions', () => {
        enum PropKeys {
            foo,
            bar,
        }

        expect(() => assertType<PropKeys>('foo', f => f in PropKeys)).not.toThrowError();
        expect(() => assertType<PropKeys>('fu', f => f in PropKeys)).toThrow();
    });
});


describe('assertNonNull', () => {

    it('throws error if predicate fails', () => {
        let n: number = 0;

        const someFunction = (thing: number | null) => {
            assertNonNull(thing);

            // type is narrowed to number
            n = thing;
        };

        someFunction(17);
        expect(n).toEqual(17);

        expect(() => someFunction(null)).toThrow();
    });
});

describe('assertUnreachable', () => {
    enum Color {
        RED,
        GREEN,
        BLUE,
    }

    const someFunction = (color: Color) => {
        switch (color) {
            case Color.RED:
                return 'red!!';
            case Color.GREEN:
                return 'green!!';
            default:
                // TS2345: Argument of type 'Color.BLUE' is not assignable to parameter of type 'never'.
                // @ts-ignore: this type error is telling us we did not exhaustively check our options
                throw assertUnreachable(color);

        }
    };

    expect(() => someFunction(Color.BLUE)).toThrow();
});
