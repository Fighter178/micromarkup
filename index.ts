type Prop = {[name:string]:string}
type evt = <T extends keyof DocumentEventMap>()=>{name:T, callback:(e?:DocumentEventMap[T])=>void}
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
export const e = <T extends keyof DocumentEventMap>(type: T, callback: (e?: DocumentEventMap[T]) => void):evt => {
    //@ts-ignore
    return () => {
        return {
            name: type,
            callback: callback
        }
    }
};

export const event = e;
export const node = n;
export const attribute = a;
export const text = t;
export const microMarkup = mk;