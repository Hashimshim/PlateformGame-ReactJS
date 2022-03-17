import Reflux from 'reflux';

const ShopActions = Reflux.createActions([
    "buyArmor",
    "buyExtraLife",
    "buyExtraLifeX3",
    "buyLevelSwitch",
    "getStatus"
]);

ShopActions.buyArmor.sync = true;
ShopActions.buyExtraLife.sync = true;
ShopActions.buyExtraLifeX3.sync = true;
ShopActions.buyLevelSwitch.sync = true;

export default ShopActions;