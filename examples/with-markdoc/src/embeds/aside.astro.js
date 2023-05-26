import {
  render as $$render,
  createAstro as $$createAstro,
  createComponent as $$createComponent,
  maybeRenderHead as $$maybeRenderHead,
  renderSlot as $$renderSlot,
  addAttribute as $$addAttribute
} from "astro/server/index.js";
import "/Users/benholmes/Repositories/astro/examples/with-markdoc/src/embeds/aside.astro?astro&type=style&index=0&lang.css";
const $$Astro = $$createAstro();
const Astro = $$Astro;
export const example = true;
const $$Aside = $$createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Aside;
  const labelByType = {
    note: "Note",
    tip: "Tip",
    caution: "Caution",
    danger: "Danger"
  };
  const { type = "note" } = Astro2.props;
  const title = Astro2.props.title ?? labelByType[type] ?? "";
  const icons = {
    note: {
      viewBox: "0 0 18 18",
      d: "M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75zM3.5 6.25a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z"
    },
    tip: {
      viewBox: "0 0 18 18",
      d: "M14 0a8.8 8.8 0 0 0-6 2.6l-.5.4-.9 1H3.3a1.8 1.8 0 0 0-1.5.8L.1 7.6a.8.8 0 0 0 .4 1.1l3.1 1 .2.1 2.4 2.4.1.2 1 3a.8.8 0 0 0 1 .5l2.9-1.7a1.8 1.8 0 0 0 .8-1.5V9.5l1-1 .4-.4A8.8 8.8 0 0 0 16 2v-.1A1.8 1.8 0 0 0 14.2 0h-.1zm-3.5 10.6-.3.2L8 12.3l.5 1.8 2-1.2a.3.3 0 0 0 .1-.2v-2zM3.7 8.1l1.5-2.3.2-.3h-2a.3.3 0 0 0-.3.1l-1.2 2 1.8.5zm5.2-4.5a7.3 7.3 0 0 1 5.2-2.1h.1a.3.3 0 0 1 .3.3v.1a7.3 7.3 0 0 1-2.1 5.2l-.5.4a15.2 15.2 0 0 1-2.5 2L7.1 11 5 9l1.5-2.3a15.3 15.3 0 0 1 2-2.5l.4-.5zM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-8.4 9.6a1.5 1.5 0 1 0-2.2-2.2 7 7 0 0 0-1.1 3 .2.2 0 0 0 .3.3c.6 0 2.2-.4 3-1.1z"
    },
    caution: {
      viewBox: "-1 1 18 18",
      d: "M8.9 1.5C8.7 1.2 8.4 1 8 1s-.7.2-.9.5l-7 12a1 1 0 0 0 0 1c.2.3.6.5 1 .5H15c.4 0 .7-.2.9-.5a1 1 0 0 0 0-1l-7-12zM9 13H7v-2h2v2zm0-3H7V6h2v4z"
    },
    danger: {
      viewBox: "0 1 14 17",
      d: "M5 .3c.9 2.2.5 3.4-.5 4.3C3.5 5.6 2 6.5 1 8c-1.5 2-1.7 6.5 3.5 7.7-2.2-1.2-2.6-4.5-.3-6.6-.6 2 .6 3.3 2 2.8 1.4-.4 2.3.6 2.2 1.7 0 .8-.3 1.4-1 1.8A5.6 5.6 0 0 0 12 10c0-2.9-2.5-3.3-1.3-5.7-1.5.2-2 1.2-1.8 2.8 0 1-1 1.8-2 1.3-.6-.4-.6-1.2 0-1.8C8.2 5.3 8.7 2.5 5 .3z"
    }
  };
  const { viewBox, d } = icons[type];
  return $$render`${$$maybeRenderHead($$result)}<aside${$$addAttribute(`content ${type} astro-C6FK6RS3`, "class")}${$$addAttribute(title, "aria-label")}>
	<p class="title astro-C6FK6RS3" aria-hidden="true">
		<span class="icon astro-C6FK6RS3">
			<svg xmlns="http://www.w3.org/2000/svg"${$$addAttribute(viewBox, "viewBox")}${$$addAttribute(16, "width")}${$$addAttribute(16, "height")} class="astro-C6FK6RS3">
				<path fill-rule="evenodd"${$$addAttribute(d, "d")} class="astro-C6FK6RS3"></path>
			</svg>
		</span>
		${title}
	</p>
	<section class="astro-C6FK6RS3">
		${$$renderSlot($$result, $$slots["default"])}
	</section>
</aside>`;
}, "/Users/benholmes/Repositories/astro/examples/with-markdoc/src/embeds/aside.astro");
export default $$Aside;
