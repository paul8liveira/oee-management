import { BaseModel } from "./baseModel";

export class ResumeImprovement extends BaseModel {
  resume_id : number;
  channel_id : number;
  channel_name?: string;
  overview : string;
  action : string;
  owner : string;
  status : number;
  resume_date : string;
  created_at : string;  
  constructor() {
    super();
  }  
}