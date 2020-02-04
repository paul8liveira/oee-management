import { BaseModel } from "./baseModel";

export class ChannelConfig extends BaseModel {
  id: number;
  channel_id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  chart_sql: string;
  mobile_sql: string;
  chart_tooltip_desc: string;
  refresh_time: number;
  logo_url: string;
  
  constructor() {
    super();
  }  
}