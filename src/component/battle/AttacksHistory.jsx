import React from 'react';
import PropTypes from 'prop-types';

const AttacksHistory = props => {
  const { battleHistory } = props;

  return (
    <ul>
      { battleHistory.map(historyItem => console.log('HistoryItem: ', historyItem)) }
    </ul>
  );
};

export default AttacksHistory;

AttacksHistory.propTypes = {
  battleHistory: PropTypes.arrayOf(),
};

AttacksHistory.defaultProps = {
  battleHistory: [],
};
