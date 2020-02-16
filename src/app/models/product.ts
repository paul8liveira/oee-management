import { BaseModel } from "./baseModel";

export class Product extends BaseModel {
  id: number;
  name: string;
  channel_id: number;
  channel_name: string;
  machine_code: string;
  machine_name: string;
  
  constructor(channel_id: number) {
    super();
    this.channel_id = channel_id;
  }  
}