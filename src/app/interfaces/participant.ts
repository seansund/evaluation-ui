import { IEvaluation } from '../interfaces/evaluation';
import { ISizing } from '../interfaces/sizing';

export enum Type {
  B = 'B',
  C = 'C'
}
export enum Status {
  Incomplete = 'Incomplete',
  Complete = 'Complete'
}

export interface IParticipant {
  firstName: string;
  lastName: string;
  email: string;
  type: Type;
  status: Status;
  createdAt: Date;
  sizing: ISizing | null;
  evaluation: IEvaluation | null;
}
