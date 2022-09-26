import { sFetch } from './service';

const ENDPOINT_BATTLE_START_BOT = userId => `/users/${userId}/battles/players/bot`;
const ENDPOINT_BATTLE_START_HUMAN = userId => `/users/${userId}/battles/players/human`;
const ENDPOINT_BATTLE_ASSAULT = (userId, battleId) => `users/${userId}/battles/${battleId}/assault`;
const ENDPOINT_BATTLE_GET_BATTLE = (userId, battleId) => `users/${userId}/battles/${battleId}`;
const ENDPOINT_BATTLE_GET_BATTLES = (userId) => `users/${userId}/battles`;


const startBattleWithBot = async userId => sFetch(ENDPOINT_BATTLE_START_BOT(userId));

const startBattleWithHuman = async userId => sFetch(ENDPOINT_BATTLE_START_HUMAN(userId));

const assault = async (userId, battleId) => sFetch(ENDPOINT_BATTLE_ASSAULT(userId, battleId));

const getBattle = async (userId, battleId) => sFetch(ENDPOINT_BATTLE_GET_BATTLE(userId, battleId));

const getBattles = async userId => sFetch(ENDPOINT_BATTLE_GET_BATTLES(userId));

export {
  startBattleWithBot,
  startBattleWithHuman,
  assault,
  getBattle,
  getBattles
};
