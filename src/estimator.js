const covid19ImpactEstimator = (data) => {
    const input = data;
    return {
        data: input,
        impact: {},
        severeImpact: {}
    };
};

export default covid19ImpactEstimator;

// impact.currentlyInfected = covid19ImpactEstimator.reportedCases * 10;
// severeImpact.currentlyInfected = reportedCases * 50;
// infectionsByRequestedTime(impact.currentlyInfected);
// infectionsByRequestedTime(severeImpact.currentlyInfected);

// function infectionsByRequestedTime(x) {
//     return x * (2 ** 10);
// }