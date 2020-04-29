module.exports = [
	["@vuepress/back-to-top"],
	[
		"clean-urls",
		{
			normalSuffix: "/",
		},
	],
	[
		"@vuepress/google-analytics",
		{
			ga: "UA-148427628-2",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "expander",
			before: (info) =>
				`<details class="expander"><summary class="expansion">${info}</summary>`,
			after: "</details>",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "guide",
			before: (info) => `<div class="guide"><p class="title">${info}</p>`,
			after: "</div>",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "aside",
			defaultTitle: "",
		},
	],
	[
		"vuepress-plugin-container",
		{
			type: "aside-guide",
			defaultTitle: "",
		},
	],
];
