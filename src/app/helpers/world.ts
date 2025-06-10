import { sortBy } from 'lodash';
import { GameCurrency, GameStateWorld, WorldLocation } from '../interfaces';
import { getCurrencyClaimsForNode, mergeCurrencyClaims } from './currency';
import { notify } from './notify';
import { gamestate, updateGamestate } from './state-game';
import { addTimerAndAction, getRegisterTick } from './timer';
import { distanceBetweenNodes } from './travel';
import { getGuardiansForLocation, getLootForLocation } from './worldgen';

export function setWorld(world: GameStateWorld): void {
  updateGamestate((state) => {
    state.world = world;
    return state;
  });
}

export function getWorldNode(
  x: number,
  y: number,
  state = gamestate(),
): WorldLocation | undefined {
  return state.world.nodes[`${x},${y}`];
}

export function getCurrentWorldNode(
  state = gamestate(),
): WorldLocation | undefined {
  const currentPosition = state.hero.position;
  return getWorldNode(currentPosition.x, currentPosition.y);
}

export function getAllNodes(): WorldLocation[] {
  return Object.values(gamestate().world.nodes);
}

export function getAllNodesInOrderOfCloseness(
  node: WorldLocation,
): WorldLocation[] {
  const nodes = getAllNodes();
  return sortBy(nodes, (n) => distanceBetweenNodes(node, n)).filter(
    (n) => n.nodeType && n.id !== node.id,
  );
}

export function getClosestUnclaimedClaimableNode(
  node: WorldLocation,
  nodes = getAllNodesInOrderOfCloseness(node),
): WorldLocation {
  return nodes.filter((n) => !n.currentlyClaimed)[0];
}

export function getNodesWithinRiskTolerance(
  node: WorldLocation,
  nodes = getAllNodesInOrderOfCloseness(node),
): WorldLocation[] {
  const riskTolerance = gamestate().hero.riskTolerance;
  const heroLevel = gamestate().hero.heroes[0].level;

  let levelThreshold = 3;
  if (riskTolerance === 'medium') levelThreshold = 7;
  else if (riskTolerance === 'high') levelThreshold = 100;
  return nodes.filter((n) => n.encounterLevel <= heroLevel + levelThreshold);
}

export function getClaimedNodes(): WorldLocation[] {
  return getAllNodes().filter((n) => n.currentlyClaimed);
}

export function claimNode(node: WorldLocation): void {
  const claims = getCurrencyClaimsForNode(node);
  mergeCurrencyClaims(claims);

  const claimDuration = (100 - node.encounterLevel) * 25;
  addTimerAndAction(
    {
      location: {
        x: node.x,
        y: node.y,
      },
      type: 'UnclaimVillage',
    },
    claimDuration,
  );

  updateGamestate((state) => {
    const updateNodeData = getWorldNode(node.x, node.y, state);
    if (updateNodeData) {
      updateNodeData.claimCount++;
      updateNodeData.currentlyClaimed = true;
      updateNodeData.guardianIds = [];
      updateNodeData.claimLootIds = [];
      updateNodeData.unclaimTime = getRegisterTick(claimDuration);
    }

    return state;
  });
}

export function unclaimNode(node: WorldLocation): void {
  const claims = getCurrencyClaimsForNode(node);
  Object.keys(claims).forEach(
    (currencyKey) =>
      (claims[currencyKey as GameCurrency] =
        -claims[currencyKey as GameCurrency]),
  );

  notify(`${node.name} was lost!`, 'LocationClaim');

  mergeCurrencyClaims(claims);

  updateGamestate((state) => {
    const updateNodeData = getWorldNode(node.x, node.y, state);
    if (updateNodeData) {
      updateNodeData.currentlyClaimed = false;
      updateNodeData.guardianIds = getGuardiansForLocation(updateNodeData).map(
        (i) => i.id,
      );
      updateNodeData.claimLootIds = getLootForLocation(updateNodeData).map(
        (i) => i.id,
      );
      updateNodeData.unclaimTime = 0;
    }

    return state;
  });
}
