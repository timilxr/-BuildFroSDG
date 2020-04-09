const covid19ImpactEstimator = (data) => {
    const impact = {};
    const severeImpact = {};

    switch (data.periodType) {
        case 'weeks':
            data.timeToElapse *= 7;
            break;
        case 'months':
            data.timeToElapse *= 30;
            break;
    }
    const days = data.timeToElapse;
    const factor = Math.trunc(days / 3);

    impact.currentlyInfected = data.reportedCases * 10;
    severeImpact.currentlyInfected = data.reportedCases * 50;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
    return {
        data,
        impact: {},
        severeImpact: {}
    };
};

export default covid19ImpactEstimator;