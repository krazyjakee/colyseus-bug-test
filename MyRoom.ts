import { Room, Client } from "colyseus";
import MapState from "./schema/room";
import ItemState from "./schema/item";

export class MyRoom extends Room<MapState> {
  timer: NodeJS.Timer;

  onCreate(options: any) {
    this.setState(new MapState());
    let counter = 0;
    this.timer = setInterval(() => {
      counter += 1;
      if (!this.state.items[`i${counter}`]) {
        this.state.items[`i${counter}`] = new ItemState(counter);
      }
      if (counter > 4) {
        counter = 0;
      }
    }, 1000);
  }

  onJoin(client: Client, options: any) {}

  onMessage(client: Client, message: any) {
    if (message.id) {
      delete this.state.items[`i${message.id}`];
    }
  }

  onLeave(client: Client, consented: boolean) {}

  onDispose() {
    clearInterval(this.timer);
  }
}
