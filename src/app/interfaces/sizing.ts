export enum Size {
  YXS = 'YXS',
  YS  = 'YS',
  YM  = 'YM',
  YL  = 'YL',
  AS  = 'AS',
  AM  = 'AM',
  AL  = 'AL',
  AXL = 'AXL'
}

export interface ISizing {
  topSize: Size;
  shirtSize: Size;
  bottomSize: Size;
  height: number;
}
