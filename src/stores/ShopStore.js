import GameActions from '../actions/GameActions';
import GameStore from './GameStore';
import LevelActions from '../actions/LevelActions';
import LevelStore from './LevelStore';
import Reflux from 'reflux';
import ShopActions from '../actions/ShopActions';

const prices = {
    armor: 50,
    extraLife: 25,
    extraLifeX3: 70,
    levelSwitch: 150
};

const ShopStore = Reflux.createStore({
    listenables: ShopActions,

    buyArmor: function() {
        GameActions.addCoins(prices.armor * -1);
        GameActions.setArmor(true);
    },

    buyExtraLife: function() {
        GameActions.addCoins(prices.extraLife * -1);
        GameActions.updateLives(GameStore.lives +1);
    },

    buyExtraLifeX3: function() {
        GameActions.addCoins(prices.extraLifeX3 * -1);
        GameActions.updateLives(GameStore.lives +3);
    },

    buyLevelSwitch: function() {
        GameActions.addCoins(prices.levelSwitch * -1);
        LevelActions.enableLevelSelection();
    },

    getPrices: function() {
        return prices;
    },

    getStatus: function() {
        this.trigger('statusChanged', {
            money: GameStore.coins,
            canBuyArmor: (GameStore.coins >= prices.armor) && !GameStore.hasArmor,
            canBuyExtraLife: GameStore.coins >= prices.extraLife,
            canBuyExtraLifeX3: GameStore.coins >= prices.extraLifeX3,
            canBuyLevelSwitch: (GameStore.coins >= prices.levelSwitch) && !LevelStore.levelSelectionEnabled
        });
    }

});

export default ShopStore;