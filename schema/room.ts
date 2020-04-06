import { Schema, MapSchema, type } from "@colyseus/schema";
import ItemState from "./item";

export default class MapState extends Schema {
  @type({ map: ItemState })
  items = new MapSchema<ItemState>();
}
