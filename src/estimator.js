const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = Math.trunc(0.35 * data.totalHospitalBeds);
  const income = data.region.avgDailyIncomeInUSD;
  const population = data.region.avgDailyIncomePopulation;
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const days = data.timeToElapse;
  const factor = Math.trunc(days / 3);
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const impactCases = Math.trunc(impact.severeCasesByRequestedTime);
  const severeCases = Math.trunc(severeImpact.severeCasesByRequestedTime);
  impact.hospitalBedsByRequestedTime = Math.trunc(beds - impactCases);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds - severeCases);

  const severeImpactInfections = Math.trunc(severeImpact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeImpactInfections);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * severeImpactInfections);

  const severeInfectionsByRequestedTime = severeImpact.infectionsByRequestedTime;
  // eslint-disable-next-line max-len
  impact.dollarsInFlight = Math.trunc(impact.infectionsByRequestedTime * income * population * days);
  severeImpact.dollarsInFlight = severeInfectionsByRequestedTime * income * population * days;
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
