/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

//  import IBoolaContract from "../screens/IBoolaContract";
 import deployedContracts from "@iboola-react-native/hardhat/deployments/hardhat_contracts.json";
 
 export const contractInfo = () => { return deployedContracts["44787"]?.["alfajores"]?.contracts; }