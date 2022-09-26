import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { assault, getBattle } from '../../service/battle-service';
import FightsHistory from './FightsHistory';
import './Battle.css';

export default function Battle(props) {
  const { battle, user } = props;
  const amIAttacker = battle.attacker && battle.attacker.user && battle.attacker.user.id === user.id;
  const [currentBattle, setCurrentBattle] = useState(battle);
  const [isMyTurn, setMyTurn] = useState(amIAttacker || (!amIAttacker && battle.fights && battle.fights[0] && battle.fights[0].attack));

  useEffect(() => {
    //setTimeout(() => {
      getBattle(user.id, battle.id).then(gotBattle => {
        setCurrentBattle(gotBattle);
        setMyTurn(true);
      });
    //}, 100);
  }, []);

  const handleAttack = () => {
    assault(user.id, battle.id).then(gotBattle => {
      setCurrentBattle(gotBattle);
      setMyTurn(true);
    });
  };

  const handleAttackClick = async () => {
    setMyTurn(false);
    await handleAttack();
  };

  const handleRetreatClick = async () => {};
  // console.log('currentBattle: ', currentBattle);
  return (
    <div className="battle">
      {battle.defender && (<>
        <p>
          Bonjour {amIAttacker ? `${currentBattle.attacker.basileus.name} ${currentBattle.attacker.basileus.nickname}` :
          `${currentBattle.defender.basileus.name} ${currentBattle.defender.basileus.nickname}`} avec une armée de {amIAttacker ? currentBattle.attacker.phalanx : currentBattle.defender.phalanx} phalanges,
        </p>
        <p>vous <strong>{amIAttacker ? 'attaquez' : 'vous défendez contre'}</strong></p>
        <p>
          {amIAttacker ? `${currentBattle.defender.basileus.name} ${currentBattle.defender.basileus.nickname}` : `${currentBattle.attacker.basileus.name} ${currentBattle.attacker.basileus.nickname}`} avec une armée de {amIAttacker ? currentBattle.defender.phalanx : currentBattle.attacker.phalanx} phalanges.
        </p>
        <FightsHistory
          fights={currentBattle.fights}
          attackerName={currentBattle.attacker.basileus.name}
          defenderName={currentBattle.defender.basileus.name}
        />
        { currentBattle.attacker.phalanx > 0 && currentBattle.defender.phalanx > 0 && (
          <div className="actions">
            <input type="button" className="retreat" value="Battre en retraite" onClick={() => handleRetreatClick()} />
            {isMyTurn && <input type="button" className="attack" value={amIAttacker ? 'Attaquer' : 'Défendre'} onClick={() => handleAttackClick()} />}
          </div>
        )}
        { /*battleHasEnded && <BattleEndedMessage didIWin={didIWin} enemyName={} /> */}
      </>)}
    </div>
  );
}

Battle.propTypes = {
  battle: PropTypes.shape({
    id: PropTypes.string,
    attacker: PropTypes.shape({
      // id: PropTypes.string.isRequired,
      phalanx: PropTypes.number,
      basileus: PropTypes.shape({
        name: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    defender: PropTypes.shape({
      // id: PropTypes.string.isRequired,
      phalanx: PropTypes.number,
      basileus: PropTypes.shape({
        name: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    fights: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
