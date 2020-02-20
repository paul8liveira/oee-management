import { BaseModel } from "./baseModel";

export class MachineProductDash extends BaseModel {
  id: number;
  channel_id: number;
  machine_code: string;
  date_ref: string;
  date_formated: string;
  value: string;
  product_id: number;
  date_dif: number;
  amount: string;
  
  constructor() {
    super();
  }  
}