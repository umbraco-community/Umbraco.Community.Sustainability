import { co2, hosting } from 'https://cdn.skypack.dev/@tgwf/co2@0.15';

export async function reportEmissions() {
  console.log("reportEmissions called");

  await scrollPage();
  await delay(2000); // give lazy-loaded resources time to load

  console.log("getting emissions data");
  const emissionsData = await getEmissionsData();
  console.log("received emissions data");

  const emissionsDiv = document.createElement("div");
  emissionsDiv.setAttribute("data-testid", "sustainabilityData");
  emissionsDiv.textContent = JSON.stringify(emissionsData);

  document.body.appendChild(emissionsDiv);
}

async function scrollPage() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  return delay(2000);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getEmissionsData() {
  console.log("calculating...");
  const resources = getResources();
  const bytesSent = getTransferSize(resources);
  const hostCheck = await hosting.check(window.location.hostname);

  const co2Emission = new co2({ model: "swd" });
  const emissions = co2Emission.perVisitTrace(bytesSent, hostCheck);

  return {
    pageWeight: bytesSent,
    carbonRating: calculateGrade(emissions.co2),
    emissions: emissions,
    resources: resources
  };
}

function getResources() {
  return window.performance.getEntriesByType("resource");
}

function getTransferSize(resources) {
  return resources.reduce((total, entry) => total + entry.transferSize, 0);
}

// grade using swd digital carbon ratings
// https://sustainablewebdesign.org/digital-carbon-ratings/
function calculateGrade(score) {
  if (score < 0.095) return 'A+';
  if (score < 0.186) return 'A';
  if (score < 0.341) return 'B';
  if (score < 0.493) return 'C';
  if (score < 0.656) return 'D';
  if (score < 0.846) return 'E';
  return 'F';
}
