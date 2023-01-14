//----------------------
async function getFlight(flightID) {
  var flight = await fetch("/flights/" + flightID).then((response) => {
    return response;
  });
  flight = await flight.json();
  return flight;
}
//----------------------
const closeForm = () => {
  var popup = document.getElementById("popup");
  popup.style.display = "None";
  var form = document.getElementById("ticketform");
  form.reset();
  var seatList = document.getElementById("seat");
  seatList.innerHTML = "";
};
//----------------------
const showTicketForm = async (flightID) => {
  var popup = document.getElementById("popup");
  var flightidtag = document.getElementById("flightid");
  flightidtag.innerHTML = "Flight ID: " + flightID;
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
};
//----------------------
const setOutboundTable = (outboundData) => {
  const outboundTableBody = document.querySelector("#outbound");
  outboundTableBody.innerHTML = "";
  const origin = (document.createElement("td").textContent =
    outboundData.origin.country +
    ", " +
    outboundData.origin.city +
    ", " +
    outboundData.origin.airport);
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
  const inboundTableBody = document.querySelector("#inbound");
  inboundTableBody.innerHTML = "";
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
//----------------------
const addOutboundToCart = async (flightID) => {
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

      return response;
    });
    outboundFlight = await outboundFlight.json();
    outboundFlight = JSON.parse(outboundFlight);
    const outbound = await getFlight(outboundFlight._id);
    if (outbound) {
      setOutboundTable(outbound);
    }
    alert("Outbound flight chosen succesfully");
  } catch (e) {
    console.log(e);
  }
};
//----------------------
const addInboundToCart = async (flightID) => {
  try {
    const data = {
      inbound: flightID,
    };

    var inboundFlight = await fetch("/cart/addinbound", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
      }

      return response;
    });
    inboundFlight = await inboundFlight.json();
    inboundFlight = JSON.parse(inboundFlight);

    const inbound = await getFlight(inboundFlight._id);
    if (inbound) {
      setInboundTable(inbound);
    }
    alert("Inbound flight chosen succesfully");
  } catch (e) {
    console.log(e);
  }
};
//----------------------
const getCartPage = () => {
  window.location.replace("/cart");
};
//----------------------
const addTicket = async (flightID) => {
  var form = document.getElementById("ticketform");
  console.log(typeof form);
  // Create a new FormData object
  var formData = new FormData(form);

  var data = {};
  for (var [key, value] of formData.entries()) {
    if (key === "seat") {
      data[key] = parseInt(value);
    } else {
      data[key] = value;
    }
  }
  data["flightid"] = flightID;
  var json = JSON.stringify(data);
  const response = await fetch("/tickets/", {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async function (response) {
    return await response.json();
  });
  alert(response);
  closeForm();
  console.log(response);
};
const addhistorydata = (ticket, flight) => {
  var tablebody = document.getElementById("mytickets");
  var flightid = document.createElement("td");
  flightid.innerText = ticket.flight;
  var name = document.createElement("td");
  name.innerText = ticket.name;
  var surname = document.createElement("td");
  surname.innerText = ticket.surname;
  var passport = document.createElement("td");
  passport.innerText = ticket.passportID;
  var origin = document.createElement("td");
  origin.innerText =
    flight.origin.country +
    ", " +
    flight.origin.city +
    ", " +
    flight.origin.airport;
  var destination = document.createElement("td");
  destination.innerText =
    flight.destination.country +
    ", " +
    flight.destination.city +
    ", " +
    flight.destination.airport;
  var departure = document.createElement("td");
  departure.innerText = flight.departure;
  var arrival = document.createElement("td");
  arrival.innerText = flight.arrival;
  var price = document.createElement("td");
  price.innerText = flight.price;

  var row = document.createElement("tr");
  row.append(flightid);
  row.append(name);
  row.append(surname);
  row.append(passport);
  row.append(origin);
  row.append(destination);
  row.append(departure);
  row.append(arrival);
  row.append(price);
  tablebody.append(row);
};
//----------------------
const addticketdata = (ticket, flight) => {
  var tablebody = document.getElementById("mytickets");
  var flightid = document.createElement("td");
  flightid.innerText = ticket.flight;
  var name = document.createElement("td");
  name.innerText = ticket.name;
  var surname = document.createElement("td");
  surname.innerText = ticket.surname;
  var passport = document.createElement("td");
  passport.innerText = ticket.passportID;
  var origin = document.createElement("td");
  origin.innerText =
    flight.origin.country +
    ", " +
    flight.origin.city +
    ", " +
    flight.origin.airport;
  var destination = document.createElement("td");
  destination.innerText =
    flight.destination.country +
    ", " +
    flight.destination.city +
    ", " +
    flight.destination.airport;
  var departure = document.createElement("td");
  departure.innerText = flight.departure;
  var arrival = document.createElement("td");
  arrival.innerText = flight.arrival;
  var price = document.createElement("td");
  price.innerText = flight.price;
  var btn = document.createElement("button");
  const btntd = document.createElement("td");
  btn.classList.add("btn");
  btn.classList.add("btn-danger");
  btn.innerHTML = "Remove";
  btn.setAttribute("onclick", "removeticket('" + ticket._id + "')");
  btntd.append(btn);
  var row = document.createElement("tr");
  row.append(flightid);
  row.append(name);
  row.append(surname);
  row.append(passport);
  row.append(origin);
  row.append(destination);
  row.append(departure);
  row.append(arrival);
  row.append(price);
  row.append(btntd);
  tablebody.append(row);
};
//----------------------
const addcartfooter = (total) => {
  var tfoot = document.getElementById("ticketfooter");
  tfoot.innerHTML = "";
  var btn = document.createElement("button");
  const btntd = document.createElement("td");
  btn.classList.add("btn");
  btn.classList.add("btn-success");
  btn.innerHTML = "Checkout";
  btn.setAttribute("onclick", "checkout()");
  btntd.append(btn);
  var totalprice = document.createElement("td");
  totalprice.innerText = "Total : " + total;
  var row = document.createElement("tr");

  for (var i = 0; i < 8; i++) {
    var emptytd = document.createElement("td");
    row.append(emptytd);
  }
  row.append(totalprice);
  row.append(btntd);
  tfoot.append(row);
};
//----------------------
const gethistory = async () => {
  const data = await fetch("/tickets/history").then((response) => {
    return response;
  });
  var datajson = await data.json();
  console.log(datajson);
  var parseddata = JSON.parse(datajson);
  return parseddata;
};
//----------------------
const gettickets = async () => {
  const data = await fetch("/cart/tickets/").then((response) => {
    return response;
  });
  var datajson = await data.json();
  console.log(datajson);
  var parseddata = JSON.parse(datajson);
  return parseddata;
};
//----------------------
const generatehistorytable = async () => {
  var mydata = await gethistory();
  var total = 0;
  console.log(mydata);
  var tablebody = document.getElementById("mytickets");
  tablebody.innerHTML = "";
  mydata.forEach((element) => {
    total += element.flight.price;
    addhistorydata(element.ticket, element.flight);
  });
};

//----------------------
const generatetickettable = async () => {
  var mydata = await gettickets();
  var total = 0;
  console.log(mydata);
  var tablebody = document.getElementById("mytickets");
  tablebody.innerHTML = "";
  mydata.forEach((element) => {
    total += element.flight.price;
    addticketdata(element.ticket, element.flight);
  });
  addcartfooter(total);
};
//----------------------
const removeticket = async (ticketid) => {
  const response = await fetch("/tickets/" + ticketid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response;
  });
  const responsejson = await response.json();
  generatetickettable();
  alert(responsejson);
};
//----------------------
const checkout = async () => {
  window.location.replace("/payment");
};
//----------------------
window.addEventListener("load", async (event) => {
  if ("/flights/search/" === window.location.pathname) {
    var chosen = await fetch("/cart/chosenflights").then((response) => {
      return response;
    });
    chosen = await chosen.json();
    chosen = JSON.parse(chosen)[0];
    const outbound = await getFlight(chosen.outbound);
    const inbound = await getFlight(chosen.inbound);
    if (outbound) {
      setOutboundTable(outbound);
    }
    if (inbound) {
      setInboundTable(inbound);
    }
  } else if ("/cart" === window.location.pathname) {
    generatetickettable();
  } else if ("/settings" === window.location.pathname) {
    generatehistorytable();
  }
});
