import { PRNG } from 'seedrandom';
import {
  GameStateWorld,
  GameStateWorldNode,
  WorldConfig,
  WorldNodeType,
} from '../interfaces';
import { gamerng, randomChoice, randomNumber, randomNumberRange } from './rng';
import { indexToSprite } from './sprite';
import { gamestate, updateGamestate } from './state-game';

function fillEmptySpaceWithEmptyNodes(
  config: WorldConfig,
  nodes: Record<string, GameStateWorldNode>,
): void {
  for (let x = 0; x < config.width; x++) {
    for (let y = 0; y < config.height; y++) {
      if (nodes[`${x},${y}`]) continue;

      nodes[`${x},${y}`] = {
        elements: [],
        name: '',
        nodeType: undefined,
        sprite: '',
        objectSprite: '',
        x,
        y,
        clearCount: 0,
        currentlyClaimed: false,
        encounterLevel: 0,
      };
    }
  }
}

function addElementsToWorld(nodes: Record<string, GameStateWorldNode>): void {
  Object.values(nodes).forEach((node) => {
    node.elements = [{ element: 'Fire', intensity: 0 }];
  });
}

function getSpriteFromNodeType(nodeType: WorldNodeType | undefined): string {
  switch (nodeType) {
    case 'town':
      return '0021';
    case 'castle':
      return '0000';
    case 'cave':
      return '0020';
    case 'dungeon':
      return '0023';
    case 'village':
      return '0022';
    default:
      return '';
  }
}

function setEncounterLevels(
  config: WorldConfig,
  nodes: Record<string, GameStateWorldNode>,
  middleNode: GameStateWorldNode,
): void {
  const { maxLevel } = config;
  const maxDistance = distanceBetweenNodes(nodes[`0,0`], middleNode);

  Object.values(nodes).forEach((node) => {
    const dist = distanceBetweenNodes(node, middleNode);
    node.encounterLevel = Math.floor((dist / maxDistance) * maxLevel);
  });
}

function determineSpritesForWorld(
  nodes: Record<string, GameStateWorldNode>,
  rng: PRNG,
): void {
  Object.values(nodes).forEach((node) => {
    node.sprite = indexToSprite(16 + randomNumber(4, rng));

    node.objectSprite = getSpriteFromNodeType(node.nodeType);
  });
}

export function generateWorld(config: WorldConfig): GameStateWorld {
  const rng = gamerng();

  const nodes: Record<string, GameStateWorldNode> = {};
  const nodeList: GameStateWorldNode[] = [];
  const nodePositionsAvailable: Record<
    string,
    { x: number; y: number; taken: boolean }
  > = {};

  for (let x = 0; x < config.width; x++) {
    for (let y = 0; y < config.height; y++) {
      nodePositionsAvailable[`${x},${y}`] = { x, y, taken: false };
    }
  }

  const findUnusedPosition: () => { x: number; y: number } = () => {
    const freeNodes = Object.values(nodePositionsAvailable).filter(
      (n) => !n.taken,
    );
    if (freeNodes.length === 0) return { x: -1, y: -1 };

    const chosenNode = randomChoice<{ x: number; y: number }>(freeNodes, rng);
    return { x: chosenNode.x, y: chosenNode.y };
  };

  const addNode = (node: GameStateWorldNode): void => {
    nodeList.push(node);
    nodes[`${node.x},${node.y}`] = node;
    nodePositionsAvailable[`${node.x},${node.y}`].taken = true;
  };

  const firstTown: GameStateWorldNode = {
    x: Math.floor(config.width / 2),
    y: Math.floor(config.height / 2),
    nodeType: 'town',
    name: 'LaFlotte',
    elements: [{ element: 'Neutral', intensity: 0 }],
    sprite: '',
    objectSprite: '',
    clearCount: 0,
    currentlyClaimed: true,
    encounterLevel: 0,
  };

  addNode(firstTown);

  Object.keys(config.nodeCount).forEach((key) => {
    const count = config.nodeCount[key as WorldNodeType];
    const nodeCount = randomNumberRange(count.min, count.max, rng);

    for (let i = 0; i < nodeCount; i++) {
      const { x, y } = findUnusedPosition();
      const node: GameStateWorldNode = {
        x,
        y,
        nodeType: key as WorldNodeType,
        name: `${key} ${i + 1}`,
        elements: [],
        sprite: '',
        objectSprite: '',
        clearCount: 0,
        currentlyClaimed: false,
        encounterLevel: 0,
      };

      addNode(node);
    }
  });

  fillEmptySpaceWithEmptyNodes(config, nodes);
  setEncounterLevels(config, nodes, firstTown);
  addElementsToWorld(nodes);
  determineSpritesForWorld(nodes, rng);

  return {
    width: config.width,
    height: config.height,
    nodes,
  };
}

export function setWorld(world: GameStateWorld): void {
  updateGamestate((state) => {
    state.world = world;
    return state;
  });
}

export function getWorldNode(
  x: number,
  y: number,
): GameStateWorldNode | undefined {
  return gamestate().world.nodes[`${x},${y}`];
}

export function distanceBetweenNodes(
  a: GameStateWorldNode,
  b: GameStateWorldNode,
): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
