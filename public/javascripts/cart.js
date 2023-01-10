var addOutboundToCart = (flightID) => {
  localStorage.removeItem("outbound");
  localStorage.setItem("outbound", flightID);
  alert("Outbound flight chosen");
};
var addInboundToCart = (flightID) => {
  localStorage.removeItem("inbound");
  localStorage.setItem("inbound", flightID);
  alert("inbound flight chosen");
};
var getCartPage = () => {
  window.location.replace("/cart");
};
var addToCart = async (ticketForm) => {};
