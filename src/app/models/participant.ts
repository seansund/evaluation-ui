const mongoose = require('mongoose');
import { Document, Schema, Model, model } from 'mongoose';
import { IParticipant, Type, Status } from '../interfaces/participant';
import { Size } from '../interfaces/sizing';

// TODO move this into a common file
mongoose.Promise = global.Promise;

const statusList = Object.keys(Status).map(k => Status[k as any]);
const typeList = Object.keys(Type).map(k => Type[k as any]);
const clothingSizeList = Object.keys(Size).map(k => Size[k as any]);

export interface IParticipantModel extends IParticipant, Document {
  fullname(): string;
}

export var SizingSchema: Schema = new Schema({
  topSize: { type: String, required: true, enum: clothingSizeList },
  shirtSize: { type: String, required: true, enum: clothingSizeList },
  bottomSize: { type: String, required: true, enum: clothingSizeList },
  height: { type: Number, required: true }
});

export var EvaluationSchema: Schema = new Schema({
  shotLeft: { type: Number, required: true },
  shotCenter: { type: Number, required: true },
  shotRight: { type: Number, required: true },
  dribbleRight: {type: Number, required: true },
  dribbleLeft: { type: Number, required: true },
  defensiveSlide: { type: Number, required: true }
});

export var ParticipantSchema: Schema = new Schema({
  createdAt: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, enum: statusList, default: statusList[0] },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: { type: String, enum: typeList, required: true },

  sizing: { type: SizingSchema },
  evaluation: { type: EvaluationSchema }
});

export function preSave() {
  let status: Status = Status.Incomplete;
  if (this.sizing) {
    if (this.type === Type.B && this.evaluation || this.type === Type.C) {
      status = Status.Complete;
    }
  }
  this.status = status;
};
ParticipantSchema.pre('save', function(next) {
  preSave.call(this);

  next();
});
ParticipantSchema.methods.fullname = function(): string {
  return (this.firstName.trim() + ' ' + this.lastName.trim());
};

export const Participant: Model<IParticipantModel> = mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);
