type Prop = {[name:string]:string}
type evt = <T extends keyof DocumentEventMap>()=>{name:T, callback:(e?:DocumentEventMap[T], options?:EventListenerOptions)=>void}
type mkElement = HTMLElement | Text | Prop | evt
export const mk = (...children:mkElement[]):HTMLElement=>{
    const div = document.createElement("div");
    children.forEach(child=>{
        if (child instanceof HTMLElement || child instanceof Text) {
            div.append(child)
        } else if (child instanceof Function) {
            const evt = child();
            div.addEventListener(evt.name, evt.callback);
        } else {
            for (const key in child) {
                const val = child[key];
                div.setAttribute(key, val);
            };
        };
    });
    div.classList.add("microMarkup")
    return div;
}
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
            }
        }
    });
    return el;
};

export const t = (text:string):Text=>{
    return document.createTextNode(text);
};
export const a = (name:string, value:string):Prop=>{
    return {[name]:value}
}
export const e = <T extends keyof DocumentEventMap>(type: T, callback: (e?: DocumentEventMap[T]) => void, options?:EventListenerOptions):evt => {
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
export const node = n;
export const attribute = a;
export const text = t;
export const microMarkup = mk;