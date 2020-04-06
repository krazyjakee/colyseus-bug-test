import * as Colyseus from "colyseus.js";

const addToList = (id) => {
  document.getElementById("list").innerHTML += `<li id="item${id}">${id}</li>`;
};

const removeFromList = (id) => {
  const elem = document.getElementById(`item${id}`);
  elem.parentNode.removeChild(elem);
};

let removingId;
const addNote = (id) => {
  if (!removingId) {
    removingId = id;
  } else {
    const note =
      removingId == id
        ? `Removed ${removingId}, no problem`
        : `Asked to remove ${removingId} but ${id} was removed`;
    document.getElementById("notes").innerHTML += `<li>${note}</li>`;
    removingId = false;
  }
};

var client = new Colyseus.Client("ws://127.0.0.1:2567");
client
  .joinOrCreate("my_room")
  .then((room) => {
    room.state.items.onAdd = (item) => {
      console.log("added", item.itemId);
      addToList(item.itemId);
    };

    room.state.items.onRemove = (item) => {
      console.log("removed", item.itemId);
      removeFromList(item.itemId);
      addNote(item.itemId);
    };

    document.getElementById("button").onclick = () => {
      const count = document.querySelectorAll("ul li").length - 1;
      const deleteId = document
        .querySelectorAll("ul li")
        [Math.floor(Math.random() * count)].getAttribute("id")
        .replace("item", "");

      addNote(deleteId);
      room.send({
        id: deleteId,
      });
      console.log("removing", deleteId);
    };
  })
  .catch((e) => {
    console.log("JOIN ERROR", e);
  });
