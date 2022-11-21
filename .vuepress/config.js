const REPO = "humansdotai/docs-humans"
module.exports = {
  theme: "@nibiruchain/vuepress-theme-cosmos",
  title: "Humans Chain",
  locales: {
    "/": {
      lang: "en-US"
    },
  },
  base: process.env.VUEPRESS_BASE || "/",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/site.webmanifest" }],
    ['meta', { name: "msapplication-TileColor", content: "#2e3148" }],
    ['meta', { name: "theme-color", content: "#ffffff" }],
    ['link', { rel: "icon", type: "image/svg+xml", href: "/favicon-svg.svg" }],
    ['link', { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }],
    ['link', { rel: "apple-touch-icon-precomposed", href: "/apple-touch-icon-precomposed.png" }],
    ["link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css",
      },
    ],
    ["link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css",
      },
    ],
  ],
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-katex"));
    },
  },
  themeConfig: {
    repo: REPO,
    docsRepo: REPO,
    docsDir: "docs",
    editLinks: true,
    label: "hub", // options: sdk, ibc, hub
    // TODO
    //algolia: {
    //  id: "BH4D9OD16A",
    //  key: "ac317234e6a42074175369b2f42e9754",
    //  index: "ibc-go"
    //},
    // Logo in the top left corner, file in .vuepress/public/
    logo: {
      src: "/humans-logo.png",
      // src: "https://raw.githubusercontent.com/peterthehan/peterthehan/master/assets/twitter.svg",
    },
    versions: [
      // {
      //   "label": "main",
      //   "key": "main"
      // },
    ],
    topbar: {
      banner: true
    },
    sidebar: {
      auto: false,
      nav: [
        {
          title: "Humans Ecosystem",
          children: [
            {
              title: "Overview",
              path: "/",
            },
            {
              title: "Governance",
              directory: true,
              path: "/ecosystem/gov"
            },
            {
              title: "Humans Blog",
              path: "https://medium.com/@HumansAI"
            },
            {
              title: "Block Explorer",
              path: "https://explorer.humans.zone/"
            },
          ]
        },
        {
          title: "Protocol Development",
          path: "dev",
          children: [
            {
              title: "Development Overview",
              directory: false,
              path: "/dev/"
            },
            {
              title: "Humans CLI",
              directory: true,
              path: "/dev/cli"
            },
            {
              title: "Module Overview",
              directory: true,
              path: "/dev/x"
            },
          ]
        },
        {
          title: "Running Nodes",
          children: [
            {
              title: "Running a Full Node",
              directory: true,
              path: "/run-nodes/testnet"
            },
            {
              title: "For Validators",
              directory: true,
              path: "/run-nodes/validators"
            },
          ]
        },
        {
          title: "Learn More",
          path: "learn",
          children: [
            {
              title: "Tokenomics",
              directory: false,
              path: "/learn/tokenomics.html"
            },
            {
              title: "FAQ",
              directory: false,
              path: "/learn/faq.html"
            },
            {
              title: "Glossary",
              directory: false,
              path: "/learn/GLOSSARY.html"
            },
          ]
        }
      ]
    },
    gutter: {
      title: "Help & Support",
      editLink: true,
      chat: {
        title: "Discord",
        text: "Chat with Humans developers on Discord.",
        url: "https://discord.gg/humansdotai",
        bg: "linear-gradient(225.11deg, #2E3148 0%, #161931 95.68%)"
      },
      github: {
        title: "Found an Issue?",
        text: "Help us improve this page by suggesting edits on GitHub."
      }
    },
    footer: {
      logo: "/humans-logo.png",
      question: {
        text: "Chat with Humans developers on <a href='https://discord.gg/humansdotai' target='_blank'>Discord</a>."
      },
      textLink: {
        text: "humans.ai",
        url: "https://humans.ai"
      },
      services: [
        {
          service: "twitter",
          url: "https://twitter.com/humansdotai"
        },
        {
          service: "medium",
          url: "https://medium.com/@HumansAI"
        },
        {
          service: "linkedin",
          url: "https://www.linkedin.com/company/humansdotai"
        },
        {
          service: "github",
          url: "https://github.com/humansdotai"
        },
        {
          service: "discord",
          url: "https://discorg.gg/humansdotai"
        },
        // {
        //   service: "reddit",
        //   url: "https://reddit.com/r/cosmosnetwork"
        // },
        // {
        //   service: "telegram",
        //   url: "https://t.me/cosmosproject"
        // },
        // {
        //   service: "youtube",
        //   url: "https://www.youtube.com/c/CosmosProject"
        // }
      ],
      smallprint:
        "[Terms of Use](https://humans.ai/terms-of-use) | [Privacy Policy](https://humans.ai/privacy-policy) | The development of [Humans](https://github.com/humansdotai) is led primarily by Humans Token AG.",
      links: [
        {
          title: "Documentation",
          children: [
            {
              title: "Tendermint Core",
              url: "https://docs.tendermint.com"
            },
            {
              title: "Cosmos SDK",
              url: "https://docs.cosmos.network"
            },
            {
              title: "Inter-Blockchain Communication (IBC)",
              url: "https://ibc.cosmos.network/"
            },
          ]
        },
        {
          title: "Community",
          children: [
            {
              title: "🌴 Link Tree",
              url: "https://linktr.ee/humansdotai"
            },
            {
              title: "Discord Chat",
              url: "https://discord.gg/humansdotai"
            },
            {
              title: "Humans blog",
              url: "https://medium.com/@HumansAI"
            },
            {
              title: "Twitter",
              url: "https://twitter.com/humansdotai"
            },
          ]
        },
        {
          title: "Contributing",
          children: [
            {
              title: "Contributing to the docs",
              url:
                `https://github.com/${REPO}/docs/blob/main/docs/DOCS_README.md`
            },
            {
              title: "Source code on GitHub",
              url: `https://github.com/${REPO}/docs/`
            }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-51029217-2"
      }
    ],
    [
      "sitemap",
      {
        hostname: "https://docs.humans.ai"
      }
    ]
  ]
};
