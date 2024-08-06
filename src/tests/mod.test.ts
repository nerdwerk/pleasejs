import { assert, assertEquals, assertIsError } from "jsr:@std/assert@1";

import createPlease from "../mod.ts";

function setup() {
    const please = createPlease();

    return {
        please,
    };
}

Deno.test("createPlease returns a new please instance", () => {
    const { please } = setup();

    assert(typeof please.remember == "function");
});

Deno.test("please instance can remember new methods", () => {
    const { please } = setup();

    const cb = () => {
        return "this should work";
    };

    please.remember("custom", cb);

    assertEquals(please.custom, cb);
    assert(please.custom() == "this should work");
});

Deno.test("#remember will not override existing methods", () => {
    const { please } = setup();

    const cb = () => {
        return "this should work";
    };

    const cb2 = () => {
        return "this should not work";
    };

    please.remember("custom", cb);
    try {
        please.remember("custom", cb2);
        throw new Error("should have failed above");
    } catch (err) {
        assertIsError(
            err,
            Error,
            'A method named "custom" was already assigned.',
        );
    }
});

Deno.test("remember will throw error for protected methods", () => {
    const { please } = setup();

    const cb = () => {
        return console.log("should not pass");
    };

    try {
        please.remember("remember", cb);
    } catch (err) {
        assertIsError(
            err,
            Error,
            'Protected Key: "remember" is a default function. Please choose a different name',
        );
    }
});
