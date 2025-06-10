import { EquipmentSkill, Hero } from '../interfaces';
import { recalculateStats } from './hero';
import { updateGamestate } from './state-game';

export function addSkillToInventory(item: EquipmentSkill): void {
  updateGamestate((state) => {
    state.inventory.skills = [...state.inventory.skills, item];
    return state;
  });
}

export function removeSkillFromInventory(item: EquipmentSkill): void {
  updateGamestate((state) => {
    state.inventory.skills = state.inventory.skills.filter(
      (i) => i.id !== item.id,
    );
    return state;
  });
}

export function equipSkill(hero: Hero, item: EquipmentSkill): void {
  removeSkillFromInventory(item);
  recalculateStats(hero);
}

export function unequipSkill(hero: Hero, item: EquipmentSkill): void {
  addSkillToInventory(item);
  recalculateStats(hero);
}
