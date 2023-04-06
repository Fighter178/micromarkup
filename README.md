# MicroMarkup
A simple library for easily defining HTML in Javascript. At version 0.0.1, it is only ~3.1 KB (minified & gziped). 

## The basics
MicroMarkup exports several functions. 
Here's them all
- `microMarkup`
- `node`
- `attribute`
- `text`
- `event`

And their aliases:
- `mk`: Alias of `microMarkup`
- `n`: Alias of `node`
- `a`: Alias of `attribute`
- `t`: Alias of `text`
- `e`: Alias of `event`

### `microMarkup` Function
This function has the alias `mk`. 

It takes a bunch of arguments, which are `mkElements` (returned from node), and returns builds the markup. It returns a `div`, containing the markup. 
### `node` Function
This creates an element. 
The first argument is the tag name for the element, for example, "div".
After that,  expects `mkElement`s, which is returned by every MicroMarkup function, except `microMarkup` and `mk`.
These are passes as spread arguments, and are appended to the node in the order they come. If `node` is called within this, it will become a child element.
### `attribute` Function 
This function takes a name for the attribute, and a value. 
If using 0.1.0 or later, it can also take an object, where the keys are the attribute names, and the values are the attribute values.
Usage:
```ts
attribute("name", "value");
```
Or, if at least 0.1.0:
```ts
attribute({
    name:"value",
    name2:"value2",
    ...
});
```
## Examples
Here are some basic examples of MicroMarkup
### Basic Buttons
These are some basic buttons.
```ts
import {node, mk, text, event} from "micromarkup";
const markup = mk(
    // You can use `n` instead, this is just for readability. Or name it yourself with `import x as y`.
    node(
        "button",
        text("Button 1"),
        event("click", ()=>alert("Click 1!"))
    ), 
    node(
        "button",
        text("Button 2"),
        event("click", ()=>alert("Click 2!")
    ),
    node(
        "button",
        text("Button 3"),
        event("click", ()=>alert("Click 3!"))
    )
);
// Render the markup
document.body.append(markup);
```
This gives this, as a `HTMLElement`: 
```html
<div>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>
```
### Nesting, Nesting, Nesting!
This is how you easily nest elements in MicroMarkup.
```ts
import {mk, n, t, a} from "micromarkup";
const markup = mk(
    n(
        "div",
        a("class", "mydiv"),
        n(
            "button",
            t("Click me!")
        ),
        n(
            "div",
            a("class", "mydiv-2"),
            n(
                "div", 
                // Class is an exception, it gets added to the classlist.
                a("class", "mydiv"),
                a("class", "div"),
                n(
                    "button",
                    t("Click me too!")
                )
            )
        )
    )
);
// Render markup
document.body.append(markup);
```
Giving this markup:
```html
<div class="mydiv">
  <button>Click me!</button>
  <div class="mydiv-2">
    <div class="mydiv div">
      <button>Click me too!</button>
    </div>
  </div>
</div>
```