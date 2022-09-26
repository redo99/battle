import React, { useState, useEffect } from 'react';
import { startBattleWithBot, startBattleWithHuman, getBattle } from '../service/battle-service';
import authenticate from '../service/user-service';
import Battles from './Battles';
import Battle from './battle/Battle';
import './Game.css';

export default function Game() {
  const [user, setUser] = useState(undefined);
  const [battle, setBattle] = useState(undefined);

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('grec-user'));
    console.log('user from storage:', storageUser);
    if (storageUser && storageUser.id) {
      setUser(storageUser);
    } else {
      authenticate().then(auth => {
        console.log('user from authentication:', auth);
        localStorage.setItem('grec-user', JSON.stringify(auth));
        setUser(auth);
      });
    }
  }, []);

  const handleStartWithBotClick = async () => {
    console.log("Game - handleStartWithBotClick() - Start");
    startBattleWithBot(user.id).then(setBattle);
    console.log("Game - handleStartWithBotClick() - End");
  };

  const handleStartWithHumanClick = async () => {
    console.log("Game - handleStartWithHumanClick() - Start");
    startBattleWithHuman(user.id).then(firstBattle => {
      console.log("Game - handleStartWithHumanClick() - startBattleWithHuman() - Start");
      setBattle(firstBattle);
      if(isSeeking(firstBattle)) {
        startUpdatingBattle(user.id, firstBattle.id);
      }
      console.log("Game - handleStartWithHumanClick() - startBattleWithHuman() - End");
    });
    console.log("Game - handleStartWithHumanClick() - End");
  };

  const startUpdatingBattle = async (userId, battleId) => {
    console.log("Game - startUpdatingBattle() - Start");
    getBattle(userId, battleId).then(gotBattle => {
      console.log("Game - startUpdatingBattle() - getBattle() - Start");
      if(isSeeking(gotBattle)) {
        setTimeout(() => startUpdatingBattle(userId, battleId), 20000);
      } else {
        setBattle(gotBattle);
      }
      console.log("Game - startUpdatingBattle() - getBattle() - End");
    });
    console.log("Game - startUpdatingBattle() - End");
  }

  const isSeeking = battle => battle && (!battle.attacker || !battle.defender);

  return (
    <>
      { user && <Battles userId={user.id} /> }
      <div className="game">
        { !user && <span>loading ...</span> }
        { user && !battle && (<>
            <input type="button" value="Bot" onClick={() => handleStartWithBotClick()} />
            <input type="button" value="Human" onClick={() => handleStartWithHumanClick()} />
          </>)
        }
        {isSeeking(battle) && <span>Looking for an enemy !!!</span>}
        { user && battle && battle.attacker != null && battle.defender != null && <Battle battle={battle} user={user} /> }
      </div>
    </>
  );
}
