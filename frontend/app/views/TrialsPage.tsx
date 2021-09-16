"use strict";

import React from 'react';

import { useDocumentTitle, useFormatMessageIdAsTagFn } from '../helpers/hooks';
import { LoadingError, LoadingScreen } from '../components/layout';
import { TrialCard } from '../components/content';
import { useQuery } from '../helpers/data';
import { Trial } from '../types';
import { R_TRIALS } from '../routes';
import { Breadcrumbs } from '../components/breadcrumbs';


const findAllTrials = (restUrl: string, webSocketUrl: string): Promise<Trial[]> => Promise.resolve([
	{ id: 1, name: 'X' },
]);

const TrialsPage = () => {

	const t = useFormatMessageIdAsTagFn();

	useDocumentTitle(t`titles.trials`);

	const op = useQuery(findAllTrials);

	if (op.loading) {
		return (
			<LoadingScreen />
		);
	}

	return (
		<>

			<Breadcrumbs
				name={R_TRIALS}
			/>

			<h1>{t`titles.trials`}</h1>

			<div className="card-grid">
				{op.error ? <LoadingError /> : (
					op.data.map(trial =>
						<TrialCard
							key={trial.id}
							trial={trial}
						/>,
					)
				)}
			</div>

		</>
	);

};

export default TrialsPage;
