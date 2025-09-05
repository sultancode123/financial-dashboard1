export type RangeKey = "3d" | "7d" | "10d" | "30d";

export type Metric = {
  label: string;
  value: number;
  mom: number; // month-over-month percentage change
};

export type Stats = {
  range: RangeKey;
  purchases: number;
  redemptions: number;
  rejectedTransactions: number;
  sipRejections: number;
  newSIP: number;
};

export type ClientsBubble = {
  name: string;
  aum: number;     // x
  clients: number; // y
  value: number;   // bubble radius/value
}[];

export type SipBusiness = {
  month: string;
  sipAmount: number;
  sipCount: number;
}[];

export type MonthlyMis = {
  month: string;
  purchases: number;
  redemptions: number;
  aum: number;
}[];
