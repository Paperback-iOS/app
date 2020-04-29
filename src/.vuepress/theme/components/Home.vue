<template>
	<main class="home" aria-labelledby="main-title">
		<header class="hero">
			<img
				v-if="data.heroImage"
				:src="$withBase(data.heroImage)"
				:alt="data.heroAlt || 'hero'"
			/>

			<h1 v-if="data.heroText !== null" id="main-title">
				{{ data.heroText || $title || "Paperback" }}
			</h1>

			<p v-if="data.tagline !== null" class="description">
				{{
					data.tagline ||
					$description ||
					"An ad-free manga reader for iOS."
				}}
			</p>

			<p v-if="data.actionText && data.actionLink" class="action">
				<a
					class="action-button action-download"
					rel="noopener noreferrer"
					:href="
						browserDownloadUrl ||
						'https://github.com/FaizanDurrani/Paperback-Public/releases'
					"
					title="Download latest release"
					:download="browserDownloadUrl ? '' : null"
				>
					<span>
						Download
					</span>
				</a>
				<NavLink
					class="action-button action-get-started"
					:item="actionLink"
				/>
			</p>
		</header>

		<div v-if="data.features && data.features.length" class="features">
			<div
				v-for="(feature, index) in data.features"
				:key="index"
				class="feature"
			>
				<h2>{{ feature.title }}</h2>
				<p>{{ feature.details }}</p>
			</div>
		</div>

		<Content class="theme-default-content custom" />

		<div v-if="data.footer" class="footer">
			{{ data.footer }}
		</div>
	</main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

import axios from "axios";

const RELEASE_URL =
	"https://api.github.com/repos/FaizanDurrani/Paperback-Public/releases/latest";

export default {
	name: "Home",

	components: { NavLink },

	data() {
		return {
			tagName: "",
			browserDownloadUrl: "",
		};
	},

	computed: {
		data() {
			return this.$page.frontmatter;
		},

		actionLink() {
			return {
				link: this.data.actionLink,
				text: this.data.actionText,
			};
		},
	},

	async mounted() {
		const { data } = await axios.get(RELEASE_URL);
		// Maybe eventually some release has more than the apk in assets.
		const apkAsset = data.assets.find((a) => a.name.includes(".ipa"));
		// Set the values.
		this.$data.tagName = data.tag_name;
		this.$data.browserDownloadUrl = apkAsset.browser_download_url;
	},
};
</script>

<style lang="stylus">
.home
	padding $navbarHeight 2rem 0
	max-width $homePageWidth
	margin 0 auto
	display block
	.hero
		text-align center
		img
			max-width 100%
			max-height $heroImageHeight
			border-radius 0.6rem
			display block
			margin 3rem auto 1.5rem
		h1
			font-size 3rem
		h1
		.description
		.action
			margin 1.8rem auto
			a
				border-radius $buttonBorderRadius
				cursor pointer
				font-family $buttonFontFamily
				font-size 1.125em
				width 10.5rem
			.action-download
				background-color $accentColorSecondary

				&:hover
					background-color lighten($accentColorSecondary, 15%)
			.action-get-started
				background-color $accentColor

				&:hover
					background-color lighten($accentColor, 15%)
		.description
			max-width 35rem
			font-size 1.6rem
			line-height 1.3
			color lighten($textColor, 40%)
		.action-button
			display inline-block
			font-size 1.2rem
			color #fff
			background-color $accentColor
			padding 0.8rem 1.6rem
			border-radius 4px
			transition background-color 0.1s ease
			box-sizing border-box
			border-bottom 1px solid darken($accentColor, 10%)
			&:hover
				background-color lighten($accentColor, 10%)
	.features
		border-top 1px solid $borderColor
		padding 1.2rem 0
		margin-top 2.5rem
		display flex
		flex-wrap wrap
		align-items flex-start
		align-content stretch
		justify-content space-between
	.feature
		flex-grow 1
		flex-basis 30%
		max-width 30%
		h2
			font-size 1.4rem
			font-weight 500
			border-bottom none
			padding-bottom 0
			color lighten($textColor, 10%)
		p
			color lighten($textColor, 25%)
	.footer
		padding 2.5rem
		border-top 1px solid $borderColor
		text-align center
		color lighten($textColor, 25%)

@media (max-width: $MQMobile)
	.home
		.features
			flex-direction column
		.feature
			max-width 100%
			padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
	.home
		padding-left 1.5rem
		padding-right 1.5rem
		.hero
			img
				max-height 210px
				margin 2rem auto 1.2rem
			h1
				font-size 2rem
			h1
			.description
			.action
				margin 1.2rem auto
			.description
				font-size 1.2rem
			.action-button
				font-size 1rem
				padding 0.6rem 1.2rem
		.feature
			h2
				font-size 1.25rem
</style>
