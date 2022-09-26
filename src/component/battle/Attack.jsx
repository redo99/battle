import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import CONSTANTS from '../../constants.js';
import './Attack.css';

export default function Attack(props) {
  const { who, attack } = props;

  // console.log('attack.action: ', attack.action);


  const drawDices = () => attack.dices.map(value => (
    <div className="dice" key={uuid()}>
      <p>{value}</p>
    </div>
  ));

  return (
    <div className="attack">
      <div className="basileus">{who}</div>
      <div className="dices-n-power">
        <div className="dices">{ drawDices() }</div>
        <div>
          <span className="label">Force de frappe </span>
          <strong>{ attack.power }</strong>
        </div>
      </div>
      <div>
        <span className="label">Actions supplémentaires: </span>
        { attack.actions && attack.actions.length > 0 ? <span className="action-sup">{ CONSTANTS.BATTLE_ACTIONS[attack.actions[0]] }</span> : <span className="na">Aucune action</span> }
      </div>
    </div>
  );
}

Attack.propTypes = {
  who: PropTypes.string.isRequired,
  attack: PropTypes.shape().isRequired,
};
