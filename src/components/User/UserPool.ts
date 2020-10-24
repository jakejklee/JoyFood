import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-west-2_iTvgRKvBV',
    ClientId: 'nri305sd3fku68s98bhttatc6'
}
export default new CognitoUserPool(poolData);