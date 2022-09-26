import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getBattles } from '../service/battle-service';
import './Battles.css';

const Battles = props => {
  const { userId } = props;
  const [battles, setBattles] = useState(undefined);

  useEffect(() => {
    getBattles(userId).then(setBattles);
  }, []);

  console.log('Battles:', battles)

  return (
    <ul className="battles-list">
      { battles && battles.map(ba => <li key={ba.id}>
        <div>{ba.creationDate}</div>
        <div>{ba.id}</div>
      </li>)
      }
    </ul>
  );
};

Battles.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Battles;