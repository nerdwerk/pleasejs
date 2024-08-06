# pleasejs 🙌🏻

The polite way of creating utility libraries.

## Getting Started

`pleasejs` comes with a super small footprint. It's goal is to give you a nice interface for all your utility methods.

### Installation

```
# deno
deno add @nerd/pleasejs

# npm (one of the below, depending on your package manager)
npx jsr add @nerd/pleasejs
yarn dlx jsr add @nerd/pleasejs
pnpm dlx jsr add @nerd/pleasejs
bunx jsr add @nerd/pleasejs
```

### Using it

It's all straight forward from here. All you need to get started it the available `remember` function to add new methods.

```
import createPlease from '@nerd/pleasejs'

const please = createPlease() // This returns a fresh please instance
```

Let's add our first method.

```
please.remember('addNumbers', (a, b) => { return a + b })
```

Now our instance knows a new method called `addNumbers`. Let's use it.

```
please.addNumbers(2, 40) // returns 42
```

And that's it. As long as you share the same instance across your app, you'll have access to all your methods.
It's recommended to add all your methods in one place, and not across the app.
A `pleasejs` instance will warn you of overloading a method, so you won't accidentally remember two methods with the same key.

**Caveats:**

This Project is written with modern runtimes like **Deno** or **Bun** in mind.
