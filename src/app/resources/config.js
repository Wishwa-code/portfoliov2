const baseURL = 'demo.app'

// Enable localization
const i18n = true;

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['en','si'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'en'         // Locale used by default and as a fallback
}

const routes = {
    '/':              true,
    '/about':         true,
    '/about/uow':     true,
    '/about/evotech':     true,
    '/about/email':   true,
    '/work':          true,
    '/blog':          true,
    '/gallery':       false,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true,
    '/about/uow': false
}

const effects = {
    gradient: true,
    dots:     true,
    lines:    false,
}

const neweffects = {
    mask: {
      cursor: true,
      x: 0,
      y: 0,
      radius: 75,
    },
    gradient: {
      display: true,
      x: 50,
      y: 0,
      width: 100,
      height: 100,
      tilt: 0,
      colorStart: "var(--accent)",
      colorEnd: "transparent",
      opacity: 50,
    },
    dots: {
      display: true,
      size: 2,
      color: "brand-on-background-weak",
      opacity: 20,
    },
    lines: {
      display: false,
      color: "red",
      opacity: 100,
    },
    grid: {
      display: false,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
  };

const style = {
    theme:       'dark',         // dark | light
    neutral:     'gray',         // sand | gray | slate
    brand:       'aqua',         // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      '#ffffff',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',     // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'playful',      // rounded | playful | conservative
    surface:     'translucent',  // filled | translucent
    transition:  'all'           // all | micro | macro
}

const display = {
    location: true,
    time:     true
}

const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        gradient: true,
        dots:     false,
        lines:    true,
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions, neweffects };