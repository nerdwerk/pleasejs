interface GenericFunction {
    // deno-lint-ignore no-explicit-any
    [key: string]: (...args: any[]) => unknown | void;
}

/**
 * The default Please interface with all it's core methods.
 */
export interface Please extends GenericFunction {
    /**
     * Add new methods to the pleasejs instance.
     * @param key the name of the method you added to the pleasejs instance
     * @param callback your function to be executed
     */
    remember: (key: string, callback: () => unknown) => void;
}

const please: Please = {
    remember(key, callback) {
        if (["remember"].includes(key)) {
            throw new Error(
                `Protected Key: "${key}" is a default function. Please choose a different name`,
            );
        }

        if (this[key]) {
            throw new Error(`A method named "${key}" was already assigned.`);
        }

        this[key] = callback;
    },
};

/**
 * Get access to a fresh pleasejs instance.
 */
export default function createPlease(): Please {
    return {
        ...please,
    };
}
