const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = 0.35 * data.totalHospitalBeds;
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

  const impactCases = impact.severeCasesByRequestedTime;
  const severeCases = severeImpact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = Math.ceil(beds - impactCases);
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(beds - severeCases);

  const severeImpactInfections = severeImpact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.floor(0.05 * severeImpactInfections);

  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * severeImpactInfections);

  const severeInfectionsByRequestedTime = severeImpact.infectionsByRequestedTime;
  const lowe = Math.floor((impact.infectionsByRequestedTime * income * population) / days);
  impact.dollarsInFlight = lowe;
  const sol = Math.floor((severeInfectionsByRequestedTime * income * population) / days);
  severeImpact.dollarsInFlight = sol;
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
