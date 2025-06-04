import { CurrencyBlock, GameCurrency, WorldLocation } from '../interfaces';
import { blankCurrencyBlock, gamestate, updateGamestate } from './state-game';
import { getClaimedNodes } from './world';

export function gainCurrency(currency: GameCurrency, amount = 1): void {
  updateGamestate((state) => {
    state.currency.currencies[currency] = Math.max(
      0,
      state.currency.currencies[currency] + amount,
    );
    return state;
  });
}

export function loseCurrency(currency: GameCurrency, amount = 1): void {
  gainCurrency(currency, -amount);
}

export function gainCurrentCurrencyClaims(): void {
  const currencyGains = gamestate().currency.currencyPerTickEarnings;

  Object.keys(currencyGains).forEach((currency) => {
    gainCurrency(
      currency as GameCurrency,
      currencyGains[currency as GameCurrency],
    );
  });
}

export function getCurrencyClaimsForNode(node: WorldLocation): CurrencyBlock {
  const base = blankCurrencyBlock();

  switch (node.nodeType) {
    case 'cave': {
      node.elements.forEach((el) => {
        const currency: GameCurrency = `${el.element} Sliver`;
        base[currency] += (1 / 100) * el.intensity;
      });
      break;
    }

    case 'dungeon': {
      node.elements.forEach((el) => {
        const currency: GameCurrency = `${el.element} Shard`;
        base[currency] += (1 / 100) * el.intensity;
      });
      break;
    }

    case 'castle': {
      node.elements.forEach((el) => {
        const currency: GameCurrency = `${el.element} Crystal`;
        base[currency] += (1 / 100) * el.intensity;
      });
      break;
    }

    case 'village': {
      base.Mana += 2;
      break;
    }
    case 'town': {
      base.Mana += 1;
      break;
    }
  }

  return base;
}

export function getUpdatedCurrencyClaims(): CurrencyBlock {
  const base = blankCurrencyBlock();
  const allClaimed = getClaimedNodes();

  allClaimed.forEach((node) => {
    const claims = getCurrencyClaimsForNode(node);
    Object.keys(claims).forEach((currencyChange) => {
      base[currencyChange as GameCurrency] +=
        claims[currencyChange as GameCurrency];
    });
  });

  return base;
}

export function mergeCurrencyClaims(delta: CurrencyBlock) {
  const current = gamestate().currency.currencyPerTickEarnings;
  Object.keys(delta).forEach((currencyChange) => {
    current[currencyChange as GameCurrency] +=
      delta[currencyChange as GameCurrency];
  });

  updateCurrencyClaims(current);
}

export function updateCurrencyClaims(
  claims = getUpdatedCurrencyClaims(),
): void {
  updateGamestate((state) => {
    state.currency.currencyPerTickEarnings = claims;
    return state;
  });
}
