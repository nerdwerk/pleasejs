import {
    assert,
    assertEquals,
    assertIsError,
    assertThrows,
} from "jsr:@std/assert@1";

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
