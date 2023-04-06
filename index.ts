type Prop = {[name:string]:string}
type evt = <T extends keyof DocumentEventMap>()=>{name:T, callback:(e?:DocumentEventMap[T])=>void, options?:EventListenerOptions}
type mkElement = HTMLElement | Text | Prop | evt;
interface optionsType {
    /** Turn legacy mode on. This is equivalent to v0.0.1 */
    legacyMode?:boolean
}
let options:optionsType = {
    legacyMode:false,

}
/** Sets config options. Supply a name, and a value. Will apply to future calls for the function(s) */
export const setOption = <T extends keyof optionsType>(optionName:T, value:optionsType[T])=>{
    options[optionName] = value
}
/** Supply an entirely new options object. */
export const setOptions = (newOptions:optionsType)=>{
    options = newOptions;
}
/**
 * The `mk` function creates a new HTML element with specified attributes, children, and event
 * listeners.
 * @param {mkElement[]} children - The `children` parameter is a rest parameter that allows the
 * function to accept an arbitrary number of arguments, each of which must be an instance of the
 * `mkElement` type. These arguments represent the child elements that will be appended to the newly
 * created `div` element.
 * Note, if an attribute is supplied (from the `attribute` or `a` function), it will be applied to the **first** child.
 * @returns The `mk` function returns an HTML element (`HTMLElement`).
 */
export const mk = (...children:mkElement[]):DocumentFragment|HTMLElement=>{
    const div = options.legacyMode ? document.createDocumentFragment() : document.createElement("div");
    children.forEach(child=>{
        if (child instanceof HTMLElement || child instanceof Text) {
            div.append(child)
        } else if (child instanceof Function) {
            const evt = child();
            div.addEventListener(evt.name, evt.callback, evt.options);
        } else {
            for (const key in child) {
                const val = child[key];
                if (options.legacyMode && div instanceof HTMLElement) {
                    div.setAttribute(key, val);
                } else div.children[0].setAttribute(key, val);
            };
        };
    });
    options.legacyMode && div instanceof HTMLElement && div.classList.add("micromakrup")
    return div;
}
/**
 * This is function creates and returns a new HTML element with specified tag name,
 * attributes, and children.
 * @param tagName - a string representing the HTML tag name of the element to be created
 * @param {mkElement[]} children - an array of mkElement, which can be either HTMLElement, Text,
 * event (function), or attributes
 * @returns {mkElement} The function `n` returns an `mkElement`.
 */
export const n = (tagName:keyof HTMLElementTagNameMap, ...children:mkElement[]):mkElement=>{
    const el = document.createElement(tagName);
    children.forEach((child)=>{
        if (child instanceof HTMLElement || child instanceof Text) {
            el.append(child);
        } else if (child instanceof Function) {
            const evt = child();
            el.addEventListener(evt.name, evt.callback);
        } else {
            for (const key in child) {
                const val = child[key];
                if (key === "class") {
                    el.classList.add(val);
                    continue;
                }
                el.setAttribute(key, val);
            };
        };
    });
    return el;
};

/**
 * The function "t" creates a new text node with the given string as its content.
 * @param {string} text - The parameter "text" is a string that represents the text content that we
 * want to create a Text node for.
 * @returns {mkElement}
 */
export const t = (text:string):Text=>{
    return document.createTextNode(text);
};
/**
 * The function takes in two string parameters and returns an object with a property named after the
 * first parameter and a value of the second parameter.
 * @param {string} name - The name parameter is a string that represents the name of a property.
 * @param {string} value - The `value` parameter is a string type and represents the value that will be
 * assigned to the property.
 * @returns Returns the @see Prop , which can be used in `n`, `node`, `mk`, `microMarkup`.
 */
export const a = (name:Record<string,string>|string, value?:string):Prop=>{
    if (name instanceof String) {
        if (!value) throw new Error("Micromarkup: Since you passed a string to the name parameter of the attribute function, the value must be defined. You did not define the value.")
        return {[name as string]:value}
    } else if (name instanceof Object) {
        let returnValue:Prop = {};
        for(const key in name) {
            returnValue = {...returnValue, [key]:name[key]}
        }
    } else {
        throw new TypeError(`Micromarkup: Invalid type for attribute function. Expected Type: string or object, type given: ${typeof name}`)
    }
    if (!value) throw new Error("Micromarkup: Required parameter: value in attribute function.");
    // This should never be reached, but anyway.
    return {[name as unknown as string]:value}
}


/**
 * This function creates an event listener with a specified type, callback function, and
 * options.
 * @param {T} type - The type of event to listen for, which is a key of the `DocumentEventMap`
 * interface.
 * @param callback - The function that will be called when the event of type `T` is triggered. It takes
 * an optional parameter `e` of type `DocumentEventMap[T]`, which represents the event object
 * associated with the triggered event.
 * @param {EventListenerOptions} [options] - `options` is an optional parameter of type
 * `EventListenerOptions` that specifies options for the event listener. 
 * @returns A function for use in `n` or `node`.
 */

export const e = <T = keyof DocumentEventMap>(type: T extends keyof DocumentEventMap ? T : string, callback: (e?: T extends keyof DocumentEventMap ? DocumentEventMap[T] : string) => void, options?:EventListenerOptions):evt => {
    //@ts-expect-error It works.
    return () => {
        return {
            name: type,
            callback,
            options
        };
    }
};
// Aliases. I know that `import as` exists, but this is fewer lines of code at the end if using Micromarkup for larger projects.

export const event = e;
export const on = event;
export const node = n;
export const createNode = n;
export const attribute = a;
export const setAttribute = a;
export const text = t;
export const microMarkup = mk;