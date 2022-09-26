import React from 'react';
import PropTypes from 'prop-types';
import Attack from './Attack';

export default function FightsHistoryItem(props) {
  const {
    fight,
    attackerName,
    defenderName,
    key,
  } = props;

  return (
    <li className="fight" key={key}>
      { fight.attack && <Attack attack={fight.attack} who={attackerName} /> }
      { fight.defense && <Attack attack={fight.defense} who={defenderName} /> }
    </li>
  );
}

FightsHistoryItem.propTypes = {
  fight: PropTypes.shape().isRequired,
  attackerName: PropTypes.string.isRequired,
  defenderName: PropTypes.string.isRequired,
};
