import { addField,
        gameProcess,
        stateGame
} from '../actions/ProcessActions'
import { enableCell } from '../actions/WithinActions'

describe('Test: Action Creators', function() {
    
    it('addField valid', function() {
        expect(addField()).to.eql({ type: 'ADD_FIELD' })
    });
    
    it('gameProcess valid', function() {
        expect(gameProcess()).to.eql({ type: 'GAME_PROCESS' })
    });
    
    it('stateGame valid', function() {
        expect(stateGame(0)).to.eql({ type: 'STATE_GAME',
                                      payload: 0
                                    })
    });
    
    it('enableCell valid', function() {
        expect(enableCell({i:0,j:0})).to.eql({ type: 'ENABLE_CELL',
                                               payload: {i:0, j:0}
                                             })
    });
});