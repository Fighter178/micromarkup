// THIS IS A DEMO FILE
import { mk, n, a, t, e } from "./index";
const div = mk(n("div", n("button", t("Button"), a("id", "mybtn"), e("click", (e) => {
    alert("Click!");
})), a("class", "mydiv"), n("br"), n("a", a("href", "/index.js"), t("See the small library!")), n("br")), n("p", t("This is so small, minification only saved ~500 bytes.")), t("Basic Markup."));
document.body.append(div);
function App() {
    return n("div", n("br"), n("button", t("Button"), e("click", () => { alert("Click"); }), e("mouseover", (e) => { console.log(e); })), n("br"), n("a", t("Home"), a("href", "/")));
}
const markup = mk(App());
document.body.append(markup);
new CustomEvent("k", {});
