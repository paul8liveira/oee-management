import { BaseModel } from "./baseModel";

export class ProgressImprovement extends BaseModel {
  progress_id?: number;  
  channel_id: number;
  description: string;
  action_description: string;
  owner: string;
  status: number;
  pause_reason_id: number;
  pause_name: string;
  gain: string;
  starts_at?: string;
  finished_at?: string;
  created_at: string;
  
  constructor() {
    super();
  }  
}