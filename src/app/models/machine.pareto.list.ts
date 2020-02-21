import { BaseModel } from "./baseModel";

class Pareto {
  product_name: string;
  amount: number;
  percentage: number;
  sum_percentage: number;
  product_name_count: string;
  count: number;
  product_name_short: string;
}

export class MachineParetoList extends BaseModel {
  pareto: Array<Pareto>;

  constructor() {
    super();
  }  
}