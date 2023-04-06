type Prop = {
    [name: string]: string;
};
type evt = <T extends keyof DocumentEventMap>() => {
    name: T;
    callback: (e?: DocumentEventMap[T]) => void;
};
type mkElement = HTMLElement | Text | Prop | evt;
export declare const mk: (...children: mkElement[]) => HTMLElement;
export declare const n: (tagName: keyof HTMLElementTagNameMap, ...children: mkElement[]) => mkElement;
export declare const t: (text: string) => Text;
export declare const a: (name: string, value: string) => Prop;
export declare const e: <T extends keyof DocumentEventMap>(type: T, callback: (e?: DocumentEventMap[T] | undefined) => void) => evt;
export declare const event: <T extends keyof DocumentEventMap>(type: T, callback: (e?: DocumentEventMap[T] | undefined) => void) => evt;
export declare const node: (tagName: keyof HTMLElementTagNameMap, ...children: mkElement[]) => mkElement;
export declare const attribute: (name: string, value: string) => Prop;
export declare const text: (text: string) => Text;
export declare const microMarkup: (...children: mkElement[]) => HTMLElement;
export {};
