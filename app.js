function roundIELTS(score) {
  let rounded = Math.round(score * 2) / 2;
  return rounded;
}

function getCEFR(band) {
  if (band >= 8.5) return "C2";
  if (band >= 7.0) return "C1";
  if (band >= 5.5) return "B2";
  if (band >= 4.0) return "B1";
  if (band >= 3.0) return "A2";
  return "A1";
}

document.getElementById("scoreForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let id = document.getElementById("id").value;
  let listening = parseFloat(document.getElementById("listening").value);
  let reading = parseFloat(document.getElementById("reading").value);
  let task1 = parseFloat(document.getElementById("task1").value);
  let task2 = parseFloat(document.getElementById("task2").value);
  let speaking = parseFloat(document.getElementById("speaking").value);
  let testDate = document.getElementById("testDate").value;
  let resultDate = document.getElementById("resultDate").value;

  let writing = (task1 + task2) / 2;
  let overall = (listening + reading + writing + speaking) / 4;
  let roundedOverall = roundIELTS(overall);
  let cefr = getCEFR(roundedOverall);

  let output = `
    <h3>Result for ${name} (${id})</h3>
    <p><b>Listening:</b> ${listening}, <b>Reading:</b> ${reading}</p>
    <p><b>Writing:</b> ${writing.toFixed(1)}, <b>Speaking:</b> ${speaking}</p>
    <p><b>Overall:</b> ${roundedOverall} | <b>CEFR:</b> ${cefr}</p>
    <p><b>Result Publication Date:</b> ${resultDate}</p>
  `;
  document.getElementById("output").innerHTML = output;

  // Save record in table
  let row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${id}</td><td>${roundedOverall}</td><td>${cefr}</td><td>${resultDate}</td>`;
  document.querySelector("#recordsTable tbody").appendChild(row);

  document.getElementById("scoreForm").reset();
});
