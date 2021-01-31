export interface WeekDayReportParams {
  channelId: number;
  machineCode: string;
  sectorId: number;
  weekNumber: string;
  yearNumber: string;
  dateIni: string;
  dateEnd: string;
}

export interface MachineWeekDayReporTableResponse {
  channel_id: number;
  machine_code: string;
  amount: number;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

export interface MachineWeekDayReporChartResponse {
  pause_name: string;
  pause_name_short: string;
  pause_type: string;
  pause: number;
  count: number;
}
