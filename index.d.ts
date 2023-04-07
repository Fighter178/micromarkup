type Prop = {
    [name: string]: string;
};
type evt = <T extends keyof DocumentEventMap>() => {
    name: T;
    callback: (e?: DocumentEventMap[T]) => void;
    options?: EventListenerOptions;
};
type mkElement = HTMLElement | Text | Prop | evt;
interface optionsType {
    /** Turn legacy mode on. This is equivalent to v0.0.1 */
    legacyMode?: boolean;
}
/** Sets config options. Supply a name, and a value. Will apply to future calls for the function(s) */
export declare const setOption: <T extends "legacyMode">(optionName: T, value: optionsType[T]) => void;
/** Supply an entirely new options object. */
export declare const setOptions: (newOptions: optionsType) => void;
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
export declare const mk: (...children: mkElement[]) => DocumentFragment | HTMLElement;
/**
 * This is function creates and returns a new HTML element with specified tag name,
 * attributes, and children.
 * @param tagName - a string representing the HTML tag name of the element to be created
 * @param {mkElement[]} children - an array of mkElement, which can be either HTMLElement, Text,
 * event (function), or attributes
 * @returns {mkElement} The function `n` returns an `mkElement`.
 */
export declare const n: (tagName: keyof HTMLElementTagNameMap, ...children: mkElement[]) => mkElement;
/**
 * The function "t" creates a new text node with the given string as its content.
 * @param {string} text - The parameter "text" is a string that represents the text content that we
 * want to create a Text node for.
 * @returns {mkElement}
 */
export declare const t: (text: string) => Text;
/**
 * The function takes in two string parameters and returns an object with a property named after the
 * first parameter and a value of the second parameter.
 * @param {string} name - The name parameter is a string that represents the name of a property.
 * @param {string} value - The `value` parameter is a string type and represents the value that will be
 * assigned to the property.
 * @returns Returns the @see Prop , which can be used in `n`, `node`, `mk`, `microMarkup`.
 */
export declare const a: (name: Record<string, string> | string, value?: string) => Prop;
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
export declare const e: <T = keyof DocumentEventMap>(type: T extends keyof DocumentEventMap ? T : string, callback: (e?: (T extends keyof DocumentEventMap ? DocumentEventMap[T] : CustomEvent<any>) | undefined) => void, options?: EventListenerOptions) => evt;
export declare const event: <T = keyof DocumentEventMap>(type: T extends keyof DocumentEventMap ? T : string, callback: (e?: (T extends keyof DocumentEventMap ? DocumentEventMap[T] : CustomEvent<any>) | undefined) => void, options?: EventListenerOptions) => evt;
export declare const on: <T = keyof DocumentEventMap>(type: T extends keyof DocumentEventMap ? T : string, callback: (e?: (T extends keyof DocumentEventMap ? DocumentEventMap[T] : CustomEvent<any>) | undefined) => void, options?: EventListenerOptions) => evt;
export declare const node: (tagName: keyof HTMLElementTagNameMap, ...children: mkElement[]) => mkElement;
export declare const createNode: (tagName: keyof HTMLElementTagNameMap, ...children: mkElement[]) => mkElement;
export declare const attribute: (name: Record<string, string> | string, value?: string) => Prop;
export declare const setAttribute: (name: Record<string, string> | string, value?: string) => Prop;
export declare const text: (text: string) => Text;
export declare const microMarkup: (...children: mkElement[]) => DocumentFragment | HTMLElement;
export {};
