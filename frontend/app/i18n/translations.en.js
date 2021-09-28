"use strict";

export default {
	locales: {
		auto: `automatically (according to the browser language)`,
		en: `English`,
		cs: `Czech`,
	},
	titles: {
		home: `Home`,
		loading: `Loading ...`,
		login: `Login`,
		notFound: `Page not found`,
		settings: `Settings`,
		teams: `Teams`,
		races: `Races`,
		newRace: `New race`,
		presentation: `TV`,
	},
	header: {
		appName: `ScoreApp`,
		toggleMenu: `Menu`,
	},
	footer: {
		sourceCode: `Source code on`,
	},
	race: {
		id: `ID`,
		type: `Type`,
		state: `State`,
		round: `Round`,
		team: `Team`,
		teamA: `Team A`,
		teamB: `Team B`,
		types: {
			time_trial: `Time trial`,
			head_to_head: `Head to head`,
		},
		states: {
			before_start: `Not yet started`,
			running: `In progress`,
			finished: `Finished`,
			unfinished: `Cancelled`,
		},
		actions: {
			detail: `Race detail`,
		},
	},
	ui: {
		add: `Add`,
		pageHeader: {
			toggle: `Open/Close menu`,
		},
		loading: `Loading ...`,
		loadingError: `An error occurred while loading data.`,
	},
	forms: {
		selectAll: `Select all`,
		selectNone: `Select none`,
		cancel: `Cancel`,
		errors: {
			fieldRequired: `Please fill this field.`,
			invalidValue: `Invalid value.`,
		},
		prompt: `-- Please select --`,
		send: `Submit`,
		reset: `Reset`,
	},
	loginForm: {
		labels: {
			email: `E-mail`,
			password: `Password`,
		},
		loading: `Logging in...`,
		login: `Login`,
	},
	settingsForm: {
		labels: {
			effectiveLocale: `Currently used language`,
			locale: `Language`,
			soundEffects: `Sound effects`,
			restUrl: `REST API URL`,
			effectiveRestUrl: `Currently used`,
			webSocketUrl: `WebSocket API URL`,
			effectiveWebSocketUrl: `Currently used`,
			authToken: `Authentication token`,
		},
		authTokenNote: `Enter token to authenticate POST requests, leave empty for no token.`,
		saveServerUrls: `Save URLs changes`,
	},
	homePage: {
		callout: {
			welcome: `Welcome to F1Tenth ScoreApp!`,
		},
	},
	racesPage: {
		createRace: `Create a new race`,
	},
	racePage: {
		notFoundHeading: `Race not found`,
		notFoundMessage: `The race with ID {id} was not found.`,
		backToRaces: `Back to all races`,
		switchToDisplayMode: `Switch to display mode`,
		switchToEditMode: `Switch to edit mode`,
		startRace: `Start race`,
		cancelRace: `Cancel race`,
		stopRace: `Stop race`,
		ignore: `Ignore`,
		unignore: `Unignore`,
		teamBtn: {
			a: `A`,
			b: `B`,
		},
		start: `Start`,
		lap: `Lap`,
		time: `Time`,
		absoluteTime: `Absolute time`,
		barrierId: `BID`,
		id: `ID`,
		showIgnored: `Show ignored`,
		showAbsoluteTime: `Show absolute time`,
		showDebugInfo: `Show debug info`,
		autoScroll: `Auto scroll`,
		allBarriers: `All barriers`,
		onlyBarrier1: `Only barrier 1`,
		onlyBarrier2: `Only barrier 2`,
		enableInteractiveMode: `Enable interactive mode`,
		disableInteractiveMode: `Disable interactive mode`,
	},
	newRaceForm: {
		labels: {
			type: `Type`,
			team: `Team`,
			teamA: `Team A`,
			teamB: `Team B`,
			round: `Round`,
		},
	},
	teamsPage: {
		createRace: `Create a new race`,
		columns: {
			id: `ID`,
			name: `Name`,
			actions: `Actions`,
		},
	},
	teamPage: {
		notFoundHeading: `Team not found`,
		notFoundMessage: `The team with ID {id} was not found.`,
		backToRaces: `Back to all teams`,
	},
	settingsPage: {
		serverUrlsHeading: `Server URLs`,
		useLocalUrlsPreset: `Use localhost:4110 (http, ws)`,
		useProductionUrlsPreset: `Use f1tenth-scoreapp.iid.ciirc.cvut.cz (https, wss)`,
	},
	notFoundPage: {
		backToHomePageBtn: `Return to the home page`,
		message: `There is no page on this address.`,
	},
	loginPage: {
		errors: {
			invalid_credentials: `Invalid login credentials.`,
			unknown: `An unknown error occurred while logging in: {message}`,
		},
		title: `Login`,
	},
	webSocketInfo: {
		heading: `WebSocket Connection State`,
		state: {
			unknown: `Unknown state`,
			urlNotSet: `URL is not set`,
			notConnected: `Not connected`,
			connecting: `Connecting`,
			connected: `Connected`,
			disconnectedMaxRetriesReached: `Disconnected, max retries reached`,
		},
		url: `URL`,
		attempt: `Attempt`,
		reconnect: `Reconnect`,
		disconnect: `Disconnect`,
		changeUrlInSettings: `Change URL is Settings`,
	},
	barriersInfo: {
		onlineBarriers: `Connected barriers`,
		none: 'none',
	},
};
