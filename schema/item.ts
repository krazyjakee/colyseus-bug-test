import { Schema, type } from "@colyseus/schema";

export default class ItemState extends Schema {
  @type("number")
  itemId: number;

  constructor(id: number) {
    super();
    this.itemId = id;
  }
}
