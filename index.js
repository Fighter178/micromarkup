export const mk = (...children) => {
    const div = document.createElement("div");
    children.forEach(child => {
        if (child instanceof HTMLElement || child instanceof Text) {
            div.append(child);
        }
        else if (child instanceof Function) {
            const evt = child();
            div.addEventListener(evt.name, evt.callback);
        }
        else {
            for (const key in child) {
                const val = child[key];
                div.setAttribute(key, val);
            }
            ;
        }
        ;
    });
    div.classList.add("microMarkup");
    return div;
};
export const n = (tagName, ...children) => {
    const el = document.createElement(tagName);
    children.forEach((child) => {
        if (child instanceof HTMLElement || child instanceof Text) {
            el.append(child);
        }
        else if (child instanceof Function) {
            const evt = child();
            el.addEventListener(evt.name, evt.callback);
        }
        else {
            for (const key in child) {
                const val = child[key];
                el.setAttribute(key, val);
            }
        }
    });
    return el;
};
export const t = (text) => {
    return document.createTextNode(text);
};
export const a = (name, value) => {
    return { [name]: value };
};
export const e = (type, callback) => {
    //@ts-ignore
    return () => {
        return {
            name: type,
            callback: callback
        };
    };
};
export const event = e;
export const node = n;
export const attribute = a;
export const text = t;
export const microMarkup = mk;
