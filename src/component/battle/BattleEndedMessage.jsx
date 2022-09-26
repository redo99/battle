import React from 'react';
import PropTypes from 'prop-types';

const BattleEndedMessage = props => {
  const { didIWin, enemyName } = props;

  return (
    <div className="modal">
      <p>{`Vous ${didIWin ? 'gagnez' : 'perdez'} la bataille contre ${enemyName}`}</p>
    </div>
  );
}

BattleEndedMessage.propTypes = {
  didIWin: PropTypes.bool.isRequired,
  enemyName: PropTypes.string.isRequired,
};

export default BattleEndedMessage;
