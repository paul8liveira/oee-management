import { BaseModel } from "./baseModel";

export class ActionImprovement extends BaseModel {
  action_id: number;
  channel_id: number;
  channel_name?: string;
  machine_code: string;
  machine_label?: string;
  pause_reason_id: number;
  pause_name?: string;
  gain: string;
  description : string;
  detailing : string;
  owner : string;
  priority : number;
  status : number;
  created_at?: string;
  finished_at?: string;
  starts_at : string;
  constructor() {
    super();
  }  
}