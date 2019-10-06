import { BaseModel } from "./baseModel";

export class PauseReason extends BaseModel {
  pause_reason_id: number;
  name: string;
  description?: string;
  active: boolean;
  type: string;
  created_at: string;
  
  constructor() {
    super();
  }  
}