interface GenericFunction {
    // deno-lint-ignore no-explicit-any
    [key: string]: (...args: any[]) => unknown | void;
}

interface Please extends GenericFunction {
    remember: (key: string, callback: () => unknown) => void;
}

const please: Please = {
    remember(key, callback) {
        if (["remember"].includes(key)) {
            throw new Error(
                `Protected Key: "${key}" is a default function. Please choose a different name`,
            );
        }

        this[key] = callback;
    },
};

export default function createPlease(options = {}): Please {
    return {
        ...please,
    };
}
