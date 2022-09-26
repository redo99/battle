import { sFetch } from './service';

const authenticate = async () => sFetch('users');

export default authenticate;
