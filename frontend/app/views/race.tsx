"use strict";

import React, { useCallback, useEffect, useState } from 'react';

import { useDocumentTitle, useFormatMessageId } from '../helpers/hooks';
import { useRoute } from '../router/hooks';
import { isDefined } from '../helpers/common';
import { LoadingError, LoadingScreen } from '../components/layout';
import { R_RACES } from '../routes';
import { Link } from '../router/compoments';
import {
	FullRace,
	HeadToHeadRace,
	RACE_STATE_BEFORE_START,
	RACE_STATE_RUNNING,
	RACE_TYPE_HEAD_TO_HEAD,
	TimeTrialRace,
} from '../types';
import { CrossingUpdater, useRaceDataExperimental } from '../helpers/races-experimental';

import IconArrowLeft from '-!svg-react-loader?name=IconEye!../images/icons/arrow-left-solid.svg';
import { OnlineBarriersInfo, WebSocketInfo } from '../components/ws';
import { Button } from '../components/common';
import classNames from 'classnames';
import { RaceTimers } from '../components/timers';
import { CrossingsList, CrossingsView } from '../components/crossings';
import { RaceStats } from '../helpers/races';

const RaceNotFound = ({ id }) => {

	const t = useFormatMessageId();

	return (
		<>
			<h1>{t(`racePage.notFoundHeading`)}</h1>
			<p>
				{t(`racePage.notFoundMessage`, { id })}
			</p>
			<Link name={R_RACES}>{t(`racePage.backToRaces`)}</Link>
		</>
	);
};


export const RacePage = () => {

	const { route } = useRoute();

	// TODO: Move payload validation and parsing to the router impl.

	const idStr = route?.payload?.raceId;

	if (typeof idStr !== 'string') {
		return (
			<RaceNotFound id={idStr} />
		);
	}

	const id = parseInt(idStr);

	if (!Number.isInteger(id)) {
		return (
			<RaceNotFound id={idStr} />
		);
	}

	return (
		<RaceView
			id={id}
			interactive={true}
		/>
	);

};


interface RaceHeaderProps {
	race: FullRace;
	interactive: boolean;
}

const RaceHeader = ({ race, interactive }: RaceHeaderProps) => {

	const t = useFormatMessageId();

	return (
		<header className="race-header">
			<div className="container">

				{interactive && (
					<Link className="btn btn-back" name={R_RACES}>
						<IconArrowLeft />
						<span className="sr-only">Back to all races</span>
					</Link>
				)}

				<div
					data-id={race.id}
					className={classNames([
						'race-details-line',
						`race--${race.type.replace('_', '-')}`,
						`race--${race.state.replace('_', '-')}`,
					])}
				>

					<div className="race-id">#{race.id}</div>

					<div className="race-type">
						{t(`race.types.${race.type}`)}
					</div>

					<div className="race-team">
						<span className="team-a">{race.teamA.name}</span>
						{race.type === RACE_TYPE_HEAD_TO_HEAD && (
							<>
								<span className="divider">vs.</span>
								<span className="team-b">{race.teamB.name}</span>
							</>
						)}
					</div>

					<div className="race-round">
						{t(`race.round`)} {race.round}
					</div>

					<div className="race-state">
						{t(`race.states.${race.state}`)}
					</div>

				</div>

				<OnlineBarriersInfo />

				<WebSocketInfo />

			</div>
		</header>
	);

};

interface RaceHeadToHeadContentProps {
	race: HeadToHeadRace;
	stats: RaceStats;
	interactive: boolean;
	updateCrossing: CrossingUpdater;
}

const RaceHeadToHeadContent = ({ race, stats, interactive, updateCrossing }: RaceHeadToHeadContentProps) => {

	const {
		startTime,
		stopTime,
		numLaps,
		bestLapTime,
		bestLapCrossingId,
		currentLapStartTime,
		enhancedCrossings,
	} = stats;

	const timersActive = race.state === RACE_STATE_RUNNING;

	return (
		<>

			<div className="race-teams">
				<div className="team-a">
					<span className="team-name-box">A</span>
					{race.teamA.name}
				</div>
				<span className="divider">vs.</span>
				<div className="team-b">
					<span className="team-name-box">B</span>
					{race.teamB.name}
				</div>
			</div>

			<div className="race-layout">

				<RaceTimers
					startTime={startTime}
					stopTime={stopTime}
					numLaps={numLaps}
					bestLapTime={bestLapTime}
					currentLapStartTime={currentLapStartTime}
					active={timersActive}
				/>

				{interactive
					? (
						<CrossingsView
							bestLapCrossingId={bestLapCrossingId}
							crossings={enhancedCrossings}
							updateCrossing={updateCrossing}
							interactive={interactive}
							barriersFilter={race.type === RACE_TYPE_HEAD_TO_HEAD}
							showTeamSetter={race.type === RACE_TYPE_HEAD_TO_HEAD}
						/>
					)
					: (
						<>
							<CrossingsList
								bestLapCrossingId={bestLapCrossingId}
								crossings={enhancedCrossings}
								showIgnored={false}
								showAbsoluteTime={false}
								showDebugInfo={false}
								visibleScrollbar={false}
								autoScroll={true}
							/>

							<CrossingsList
								bestLapCrossingId={bestLapCrossingId}
								crossings={enhancedCrossings}
								showIgnored={false}
								showAbsoluteTime={false}
								showDebugInfo={false}
								visibleScrollbar={false}
								autoScroll={true}
							/>
						</>
					)
				}

				<RaceTimers
					startTime={startTime}
					stopTime={stopTime}
					numLaps={numLaps}
					bestLapTime={bestLapTime}
					currentLapStartTime={currentLapStartTime}
					active={timersActive}
				/>

			</div>
		</>
	);

};

interface RaceTimeTrialContentProps {
	race: TimeTrialRace;
	stats: RaceStats;
	interactive: boolean;
	updateCrossing: CrossingUpdater;
}

const RaceTimeTrialContent = ({ race, stats, interactive, updateCrossing }: RaceTimeTrialContentProps) => {

	const {
		startTime,
		stopTime,
		numLaps,
		bestLapTime,
		bestLapCrossingId,
		currentLapStartTime,
		enhancedCrossings,
	} = stats;

	const timersActive = race.state === RACE_STATE_RUNNING;

	return (
		<div className="race-layout">

			<RaceTimers
				startTime={startTime}
				stopTime={stopTime}
				numLaps={numLaps}
				bestLapTime={bestLapTime}
				currentLapStartTime={currentLapStartTime}
				active={timersActive}
			/>

			<CrossingsView
				bestLapCrossingId={bestLapCrossingId}
				crossings={enhancedCrossings}
				updateCrossing={updateCrossing}
				interactive={interactive}
				barriersFilter={false}
				showTeamSetter={false}
			/>

		</div>
	);

};


export interface RaceViewProps {
	id: number;
	interactive: boolean;
}

export const RaceView = ({ id, interactive = true }: RaceViewProps) => {

	const t = useFormatMessageId();

	const [forceNonInteractive, setForceNonInteractive] = useState(false);

	const toggleForceNonInteractive = useCallback(() => {
		setForceNonInteractive(prevValue => !prevValue);
	}, [setForceNonInteractive]);

	useEffect(() => {

		let didUnsubscribe = false;

		const handler = (event: KeyboardEvent) => {

			if (didUnsubscribe) {
				return;
			}

			if (event.repeat) {
				return;
			}

			if (event.key === 'i' || event.key === 'I') {
				toggleForceNonInteractive();
			}

		};

		window.addEventListener('keydown', handler);

		return () => {
			didUnsubscribe = true;
			window.removeEventListener('keydown', handler);
		};

	}, [toggleForceNonInteractive]);

	const { op, startRace, stopRace, cancelRace, updateCrossing } = useRaceDataExperimental(id);

	const pageTitle = op.loading ?
		t(`titles.loading`)
		: !isDefined(op.data) ? t(`titles.notFound`) : op.data.race.id.toString();

	useDocumentTitle(pageTitle);

	if (op.loading) {
		return (
			<LoadingScreen />
		);
	}

	if (op.hasError) {
		return (
			<LoadingError error={op.error} />
		);
	}

	if (!isDefined(op.data)) {
		return (
			<RaceNotFound id={id} />
		);
	}

	const race = op.data.race;

	return (
		<div className="race">

			<RaceHeader
				race={race}
				interactive={interactive}
			/>

			<main className="race-content">

				<div className="container">

					{interactive && (
						<div className="race-toolbar">

							<Button
								style="flex"
								onClick={toggleForceNonInteractive}
							>
								<kbd className="dark left">I</kbd>{' '}
								{t(`racePage.${forceNonInteractive
									? 'enableInteractiveMode'
									: 'disableInteractiveMode'
								}`)}
							</Button>

							{!forceNonInteractive && race.state === RACE_STATE_BEFORE_START && (
								<Button
									style="default"
									label="racePage.startRace"
									onClick={startRace}
								/>
							)}

							{!forceNonInteractive && race.state === RACE_STATE_RUNNING && (
								<Button
									style="default"
									label="racePage.stopRace"
									onClick={stopRace}
								/>
							)}

							{!forceNonInteractive && race.state === RACE_STATE_RUNNING && (
								<Button
									style="default"
									label="racePage.cancelRace"
									onClick={cancelRace}
								/>
							)}

						</div>
					)}

					{race.type === RACE_TYPE_HEAD_TO_HEAD
						? (
							<RaceHeadToHeadContent
								race={race}
								stats={op.data.stats}
								interactive={forceNonInteractive ? false : interactive}
								updateCrossing={updateCrossing}
							/>
						)
						: (
							<RaceTimeTrialContent
								race={race}
								stats={op.data.stats}
								interactive={forceNonInteractive ? false : interactive}
								updateCrossing={updateCrossing}
							/>
						)
					}

				</div>

			</main>

		</div>
	);

};
