//----------------------
const getInboundFlight = async () => {
  console.log("3");
  const inbound = await fetch(
    "/flights/" + localStorage.getItem("inbound")
  ).then((response) => {
    return response.json();
  });
  return inbound;
};
async function getOutboundFlight(flightID) {
  console.log("12");
  var outbound = await fetch("/flights/" + flightID).then((response) => {
    return response;
  });
  outbound = await outbound.json();
  //console.log(outbound.text());
  return outbound;
}
const closeForm = () => {
  var popup = document.getElementById("popup");
  popup.style.display = "None";
  var form = document.getElementById("ticketForm");
  form.reset();
  var seatList = document.getElementById("seat");
  seatList.innerHTML = "";
};
//----------------------
const showTicketForm = async (flightID) => {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  var cancelBtn = document.getElementById("cancel");
  cancelBtn.setAttribute("onclick", "closeForm()");
  var addBtn = document.getElementById("addticket");
  addBtn.setAttribute("onclick", "addTicket('" + flightID + "')");
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
  //console.log(outboundData);
  const outboundTableBody = document.querySelector("#outbound");
  outboundTableBody.innerHTML = "";
  const origin = (document.createElement("td").textContent =
    outboundData.origin.country +
    ", " +
    outboundData.origin.city +
    ", " +
    outboundData.origin.airport);
  //console.log(origin);
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
  //console.log(inboundData);
  const inboundTableBody = document.querySelector("#inbound");
  inboundTableBody.innerHTML = "";
  //console.log(inboundTableBody);
  const origin = (document.createElement("td").textContent =
    inboundData.origin.country +
    ", " +
    inboundData.origin.city +
    ", " +
    inboundData.origin.airport);
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
const addOutboundToCart = async (flightID) => {
  console.log("135");
  console.log(flightID);
  try {
    const data = {
      outbound: flightID,
    };

    var outboundFlight = await fetch("/cart/addoutbound", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
      }
      alert("Outbound flight chosen succesfully");
      return response;
    });
    outboundFlight = await outboundFlight.json();
    outboundFlight = JSON.parse(outboundFlight);
    console.log("153");
    console.log(outboundFlight._id);
    const outbound = await getOutboundFlight(outboundFlight._id);
    console.log("154");
    console.log(outbound);
    console.log("155");
    if (outbound) {
      setOutboundTable(outbound);
    }
  } catch (e) {
    console.log(e);
  }
};
const addInboundToCart = async (flightID) => {
  localStorage.removeItem("inbound");
  localStorage.setItem("inbound", flightID);
  alert("inbound flight chosen");
  const inbound = await getInboundFlight();
  if (inbound) {
    setInboundTable(inbound);
  }
};
const getCartPage = () => {
  window.location.replace("/cart");
};
const addToCart = async (ticketForm) => {};
//----------------------
//window.addEventListener("load", async (event) => {
// if ("/flights/search/" === window.location.pathname) {
//const inbound = await getInboundFlight();
// const outbound = await getOutboundFlight();
// if (outbound) {
// setOutboundTable(outbound);
//}
//if (inbound) {
//  setInboundTable(inbound);
// }
//}
//});
