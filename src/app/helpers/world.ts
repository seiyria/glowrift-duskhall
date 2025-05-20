import {
  GameStateWorld,
  GameStateWorldNode,
  WorldConfig,
  WorldNodeType,
} from '../interfaces';
import { randomNumberRange, seededrng } from './rng';
import { myGameId } from './state-game';

function addElementsToWorld(nodes: Record<string, GameStateWorldNode>): void {
  Object.values(nodes).forEach((node) => {
    node.elements = [{ element: 'Fire', intensity: 0 }];
  });
}

export function generateWorld(config: WorldConfig): GameStateWorld {
  const nodes: Record<string, GameStateWorldNode> = {};
  const nodeList: GameStateWorldNode[] = [];

  const findUnusedPosition: () => { x: number; y: number } = () => {
    const rng = seededrng(myGameId());
    let x: number;
    let y: number;

    do {
      x = Math.floor(rng() * config.width);
      y = Math.floor(rng() * config.height);
    } while (nodes[`${x},${y}`]);

    return { x, y };
  };

  const addNode = (node: GameStateWorldNode): void => {
    nodeList.push(node);
    nodes[`${node.x},${node.y}`] = node;
  };

  const firstTown: GameStateWorldNode = {
    x: Math.floor(config.width / 2),
    y: Math.floor(config.height / 2),
    nodeType: 'town',
    name: 'LaFlotte',
    elements: [{ element: 'Neutral', intensity: 0 }],
  };

  addNode(firstTown);

  Object.keys(config.nodeCount).forEach((key) => {
    const count = config.nodeCount[key as WorldNodeType];
    const nodeCount = randomNumberRange(count.min, count.max, myGameId());

    for (let i = 0; i < nodeCount; i++) {
      const { x, y } = findUnusedPosition();
      const node: GameStateWorldNode = {
        x,
        y,
        nodeType: key as WorldNodeType,
        name: `${key} ${i + 1}`,
        elements: [],
      };

      addNode(node);
    }
  });

  addElementsToWorld(nodes);

  return {
    width: config.width,
    height: config.height,
    nodes,
  };
}
