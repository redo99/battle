import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import FightsHistoryItem from './FightsHistoryItem';

export default function FightsHistory(props) {
  console.log('FightsHistory props: ', props);
  const { fights, attackerName, defenderName } = props;

  const draw = () =>
      <ul className="fight-history">
        { fights.map(fight => (
          <FightsHistoryItem
            fight={fight}
            attackerName={attackerName}
            defenderName={defenderName}
            key={uuid()}
          />
        )) }
      </ul>;
  return (fights && fights.length > 0 && draw());
}

FightsHistory.propTypes = {
  fights: PropTypes.arrayOf(FightsHistoryItem),
  attackerName: PropTypes.string.isRequired,
  defenderName: PropTypes.string.isRequired,
};

FightsHistory.defaultProps = {
  fights: undefined,
};
