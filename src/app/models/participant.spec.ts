require('should');
import { expect } from 'chai';
import { IParticipantModel, Participant } from './participant';
import { Size } from '../interfaces/sizing';
import { replace, when, verify, reset } from 'testdouble';

describe('Participant Model', () => {
  it('canary verifies test infrastructure', () => {
    true.should.be.true('boolean');
  });

  describe('behaves as follows', () => {
    let participant: IParticipantModel;
    beforeEach(() => {
      participant = new Participant();
    });
    const noopSuccess = () => {
      expect.fail('success callback should not be called');
    };

    it('status should be "Incomplete" to start', () => {
      participant.status.should.equal('Incomplete');
    });

    it('should require "type"', () => {
      return participant.validate().then(noopSuccess, (error: any) => {
        error.errors['type'].message.should.equal('Path `type` is required.');
      });
    });

    it('should require "email"', () => {
      return participant.validate().then(noopSuccess, (error: any) => {
        error.errors['email'].message.should.equal('Path `email` is required.');
      });
    });

    it('should require "firstName"', () => {
      return participant.validate().then(noopSuccess, (error: any) => {
        error.errors['firstName'].message.should.equal('Path `firstName` is required.');
      });
    });

    it('should require "lastName"', () => {
      return participant.validate().then(noopSuccess, (error: any) => {
        error.errors['lastName'].message.should.equal('Path `lastName` is required.');
      });
    });

    it('"type" should only allow values "B" or "C" but not "D"', () => {
      return new Participant({type: 'B'}).validate().then(noopSuccess, (error: any) => {
        (!!error.errors['type']).should.be.false('boolean');
        return new Participant({type: 'C'}).validate().then(noopSuccess, (error: any) => {
          (!!error.errors['type']).should.be.false('boolean');
          return new Participant({type: 'D'}).validate().then(noopSuccess, (error: any) => {
            (!!error.errors['type']).should.be.true('boolean');
          });
        });
      });
    });

    describe('sizing', () => {
      it('should have undefined sizing by default', () => {
        (!!participant.sizing).should.be.false('boolean');
      });
      it('should not require "sizing"', () => {
        return participant.validate().then(noopSuccess, (error: any) => {
          (!!error.errors['sizing']).should.be.false('boolean');
        });
      });
      it('should allow sizing to be added after initialization', () => {
        let tmp: Size;
        participant.sizing = {
          topSize: tmp,
          shirtSize: Size.YL,
          bottomSize: Size.AL,
          height: 60
        };
        return participant.validate().then(noopSuccess, (error: any) => {
          error.errors['sizing'].message.should.equal('Validation failed: topSize: Path `topSize` is required.');
        });
      });
    });
  });
});