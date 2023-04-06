import { mk, n, a, t, e } from "./index";
const div = mk(n("div", n("button", t("Button"), a("id", "mybtn"), e("click", (e) => {
    alert("Click!");
})), a("class", "mydiv"), n("br"), n("a", a("href", "/index.js"), t("See the small library!")), n("br")), n("p", t("This is so small, minification only saved ~500 bytes.")));
document.body.append(div);
document.head.append(mk(n("style", t("*{font-family:Roboto, Arial, sans-serif}"))));
