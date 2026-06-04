/* Tweaks panel for Saanvi's Rangapravesha
   Sets CSS custom properties + body/html classes on the vanilla page. */

const PALETTES = /*EDITMODE-BEGIN*/{
  temple: {
    label: "Temple — maroon & gold",
    dark: false,
    vars: {
      "--c-bg":"#f7efe0","--c-bg-2":"#f1e6d2","--c-surface":"#fffaf1",
      "--c-ink":"#3a241c","--c-ink-soft":"#6f5848","--c-line":"#e0d0b3",
      "--c-maroon":"#6e1023","--c-maroon-deep":"#2c0810",
      "--c-gold":"#b6862c","--c-gold-soft":"#d6ab57","--c-gold-bright":"#e9c873","--c-accent":"#b5532e",
      "--c-hero-bg":"#2c0810","--c-hero-bg-2":"#4a0f1d","--c-hero-fg":"#f4e3c4","--c-hero-gold":"#e3bd6a"
    }
  },
  ivory: {
    label: "Ivory editorial — brick",
    dark: false,
    vars: {
      "--c-bg":"#f6f1e7","--c-bg-2":"#efe7d7","--c-surface":"#fffdf8",
      "--c-ink":"#2a2018","--c-ink-soft":"#6b5c4c","--c-line":"#e4d9c6",
      "--c-maroon":"#8a2d24","--c-maroon-deep":"#3a1712",
      "--c-gold":"#a8842f","--c-gold-soft":"#c9a35a","--c-gold-bright":"#e0c178","--c-accent":"#c4582f",
      "--c-hero-bg":"#2e1a14","--c-hero-bg-2":"#51251a","--c-hero-fg":"#f2e6d2","--c-hero-gold":"#dcb878"
    }
  },
  green: {
    label: "Silk sari — green & gold",
    dark: false,
    vars: {
      "--c-bg":"#f4f0e2","--c-bg-2":"#ebe6d2","--c-surface":"#fcfaf0",
      "--c-ink":"#22302a","--c-ink-soft":"#5a6b60","--c-line":"#d8d6bf",
      "--c-maroon":"#0f4d3c","--c-maroon-deep":"#08281f",
      "--c-gold":"#c69a3a","--c-gold-soft":"#ddb95f","--c-gold-bright":"#ecd082","--c-accent":"#b5532e",
      "--c-hero-bg":"#0c3a2e","--c-hero-bg-2":"#15543f","--c-hero-fg":"#f3ead0","--c-hero-gold":"#e6c873"
    }
  },
  cinematic: {
    label: "Cinematic — dark plum",
    dark: true,
    vars: {
      "--c-bg":"#1b0e12","--c-bg-2":"#241016","--c-surface":"#2a131a",
      "--c-ink":"#f1ddc4","--c-ink-soft":"#c8a98f","--c-line":"#4a2530",
      "--c-maroon":"#b03249","--c-maroon-deep":"#120608",
      "--c-gold":"#d9b25f","--c-gold-soft":"#e3bd6a","--c-gold-bright":"#f0d488","--c-accent":"#d56b43",
      "--c-hero-bg":"#120608","--c-hero-bg-2":"#2e0e16","--c-hero-fg":"#f1ddc4","--c-hero-gold":"#e6c170"
    }
  }
}/*EDITMODE-END*/;

const DISPLAY_FONTS = {
  cormorant: '"Cormorant Garamond", Georgia, serif',
  marcellus: '"Marcellus", Georgia, serif',
  playfair:  '"Playfair Display", Georgia, serif'
};
const BODY_FONTS = {
  spectral:  '"Spectral", Georgia, serif',
  ebgaramond:'"EB Garamond", Georgia, serif'
};

const TWEAK_DEFAULTS = {
  palette: "temple",
  display: "cormorant",
  body: "spectral",
  ornament: "some",   // min | some | rich
  scale: 1
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(function () {
    const root = document.documentElement;
    const pal = PALETTES[t.palette] || PALETTES.temple;
    Object.entries(pal.vars).forEach(function (kv) { root.style.setProperty(kv[0], kv[1]); });
    root.classList.toggle("is-dark", !!pal.dark);

    root.style.setProperty("--font-display", DISPLAY_FONTS[t.display] || DISPLAY_FONTS.cormorant);
    root.style.setProperty("--font-body", BODY_FONTS[t.body] || BODY_FONTS.spectral);

    document.body.classList.remove("ornament-min", "ornament-some", "ornament-rich");
    document.body.classList.add("ornament-" + t.ornament);

    document.body.style.fontSize = (18 * t.scale) + "px";
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Palette" />
      <TweakSelect label="Color theme" value={t.palette}
        options={Object.keys(PALETTES).map(function (k) { return { value: k, label: PALETTES[k].label }; })}
        onChange={function (v) { setTweak("palette", v); }} />

      <TweakSection label="Typography" />
      <TweakSelect label="Headings" value={t.display}
        options={[{value:"cormorant",label:"Cormorant — classical"},{value:"marcellus",label:"Marcellus — temple"},{value:"playfair",label:"Playfair — dramatic"}]}
        onChange={function (v) { setTweak("display", v); }} />
      <TweakRadio label="Body" value={t.body}
        options={[{value:"spectral",label:"Spectral"},{value:"ebgaramond",label:"Garamond"}]}
        onChange={function (v) { setTweak("body", v); }} />
      <TweakSlider label="Text size" value={t.scale} min={0.9} max={1.2} step={0.05} unit="\u00d7"
        onChange={function (v) { setTweak("scale", v); }} />

      <TweakSection label="Ornament" />
      <TweakRadio label="Density" value={t.ornament}
        options={[{value:"min",label:"Minimal"},{value:"some",label:"Tasteful"},{value:"rich",label:"Rich"}]}
        onChange={function (v) { setTweak("ornament", v); }} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
