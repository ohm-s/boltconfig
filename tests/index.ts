import { arrayEnv, numericEnv, stringEnv } from '../src/index';
import { assert } from 'console';

process.env.user_id = '306';
process.env.hosts = JSON.stringify(['host1', 'host2']);
process.env.name = '306 - Now In-Use';

class testenv {
  @numericEnv(404)
  user_id?: number;

  @arrayEnv(['host1', 'host2'])
  hosts?: string[];

  @stringEnv('name')
  name?: string;

  @stringEnv('some value')
  weirdVariableNameNotInEnv?: string;
}

describe('logger tests', () => {
  it('basic validation', (done) => {
    let obj: Required<testenv> = new testenv() as any;

    assert(obj.user_id == 306, 'Value should be 306');
    assert(obj.name == '306 - Now In-Use', 'Value should be in use');
    assert(obj.hosts[0] == 'host1', 'Hosts should be configured');
    assert(obj.weirdVariableNameNotInEnv == 'some value', 'Value should be some value');

    let str = JSON.stringify(obj);

    assert(str == '{}', 'Information should be not logged / serialized ');
    done();
  });
});
