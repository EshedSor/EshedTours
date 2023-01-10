//----------------------
const getOutboundFlight = async () => {
  const outbound = await fetch(
    "/flights/" + localStorage.getItem("outbound")
  ).then((response) => {
    return response.json();
  });
  return outbound;
};
//----------------------
const getInboundFlight = async () => {
  const inbound = await fetch(
    "/flights/" + localStorage.getItem("inbound")
  ).then((response) => {
    return response.json();
  });
  return inbound;
};
//----------------------
const showTicketForm = async (flightID) => {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  var availableSeats = await fetch("/flights/" + flightID + "/seats").then(
    (response) => {
      return response.json();
    }
  );
  var seatList = document.getElementById("seat");
  availableSeats = JSON.parse(availableSeats);
  availableSeats.forEach((element) => {
    var optionItem = document.createElement("option");
    optionItem.setAttribute("value", element);
    optionItem.innerHTML = element;
    seatList.append(optionItem);
  });
  //console.log(availableSeats);
};
//----------------------
const setOutboundTable = (outboundData) => {
  console.log(outboundData);
  const outboundTableBody = document.querySelector("#outbound");
  console.log(outboundTableBody);
  const origin = (document.createElement("td").textContent =
    outboundData.origin.country +
    ", " +
    outboundData.origin.city +
    ", " +
    outboundData.origin.airport);
  console.log(origin);
  const destination = document.createElement("td");
  destination.textContent =
    outboundData.destination.country +
    ", " +
    outboundData.destination.city +
    ", " +
    outboundData.destination.airport;
  const departure = document.createElement("td");
  departure.textContent = outboundData.departure;
  const arrival = document.createElement("td");
  arrival.textContent = outboundData.arrival;
  const price = document.createElement("td");
  price.textContent = outboundData.price;
  const tr = document.createElement("tr");
  const btntd = document.createElement("td");
  var btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add("btn-success");
  btn.innerHTML = "add ticket";
  btn.setAttribute("onclick", "showTicketForm('" + outboundData._id + "')");
  btntd.append(btn);
  tr.append(origin);
  tr.append(destination);
  tr.append(departure);
  tr.append(arrival);
  tr.append(price);
  tr.append(btntd);
  outboundTableBody.append(tr);
};
//----------------------
const setInboundTable = (inboundData) => {
  console.log(inboundData);
  const inboundTableBody = document.querySelector("#inbound");
  console.log(inboundTableBody);
  const origin = (document.createElement("td").textContent =
    inboundData.origin.country +
    ", " +
    inboundData.origin.city +
    ", " +
    inboundData.origin.airport);
  console.log(origin);
  const destination = document.createElement("td");
  destination.textContent =
    inboundData.destination.country +
    ", " +
    inboundData.destination.city +
    ", " +
    inboundData.destination.airport;
  const departure = document.createElement("td");
  departure.textContent = inboundData.departure;
  const arrival = document.createElement("td");
  arrival.textContent = inboundData.arrival;
  const price = document.createElement("td");
  price.textContent = inboundData.price;
  var btn = document.createElement("button");
  const btntd = document.createElement("td");
  btn.classList.add("btn");
  btn.classList.add("btn-success");
  btn.innerHTML = "add ticket";
  btn.setAttribute("onclick", "showTicketForm('" + inboundData._id + "')");
  btntd.append(btn);
  const tr = document.createElement("tr");
  tr.append(origin);
  tr.append(destination);
  tr.append(departure);
  tr.append(arrival);
  tr.append(price);
  tr.append(btntd);
  inboundTableBody.append(tr);
};
//----------------------
window.addEventListener("load", async (event) => {
  const inbound = await getInboundFlight();
  const outbound = await getOutboundFlight();
  if (outbound) {
    setOutboundTable(outbound);
  }
  if (inbound) {
    setInboundTable(inbound);
  }
});
