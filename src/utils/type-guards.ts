/**
 * Gives a type T to a value if predicate check returns true. Otherwise throws an error.
 *
 * @example
 * ```typescript
 *  const thing = ''
 *  assertType<number>(thing, thing => typeof thing === 'number'); // Throws an error
 *
 *  const thing = 1;
 *  assertType<number>(thing, thing => typeof thing === 'number'); // No error
 * ```
 * @returns: void
 */
export function assertType<T>(value: any, predicate: (value: any) => boolean, message?: string): asserts value is T {
    if (!predicate(value)) {
        throw new Error(message ?? `Invalid value: ${value}`);
    }
}

/**
 * Checks if a value T is equal null
 *
 * @example
 * ```typescript
 *  const thing = null;
 *  assertNonNull(thing); // Throws an error
 *
 *  const thing = 'test';
 *  assertNonNull(thing); // No error
 * ```
 * @returns: void
 */
export function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
    return assertType<T>(value, value => value != null, message);
}

/**
 * Gives a type T to a value if predicate check returns true. Otherwise return false.
 *
 * @example
 * ```typescript
 *  const thing = null;
 *  isOfType<number>(thing, thing => typeof thing === 'number'); // false
 *
 *  const thing = 'test';
 *  isOfType<string>(thing, thing => typeof thing === 'string'); // true
 * ```
 * @returns: boolean
 */
export function isOfType<T>(value: any, predicate: (value: any) => boolean): value is T {
    return predicate(value);
}

/**
 * Throws an error.
 *
 * @example
 * ```typescript
 * const groups = ['charlie', 'bravo'];
 * groups.forEach(group => {
 *     switch(group) {
 *         case 'charlie':
 *              ...
 *         case 'bravo':
 *              ...
 *         default:
 *              assertUnreachable(group); // group has type 'never'
 *     }
 * });
 * ```
 * @returns: void
 */
export const assertUnreachable = (x: never): never => {
    throw new Error(`This code should not be reachable! Did not expect ${JSON.stringify(x, null, 4)}`)
}

/**
 * Help to check a prediction only for the first member of an array.
 *
 * @example
 * ```typescript
 * const thing = 'string';
 * assertType<string[]>(thing, validateFirstElementInList(firstElement, el => typeof el === 'string'));
 * ```
 * @returns: boolean
 */
export function validateFirstElementInList(list: any[], check: (element: any) => boolean): boolean {
    if (Array.isArray(list)) {
        if (list.length > 0) {
            return check(list[0]);
        } else {
            return true;
        }
    } else {
        return false;
    }
}