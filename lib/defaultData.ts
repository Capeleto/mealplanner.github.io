import type { AppState, ApplianceKey, DayKey, PrepKey } from './types';

export const APPLIANCE_KEYS: Array<ApplianceKey> = [
  'stovePan', 'stovePot', 'oven', 'slowCooker', 'airFryer',
  'riceCooker', 'instantPot', 'steamer', 'other',
];
export const DAY_KEYS: Array<DayKey> = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const PREP_KEYS: Array<PrepKey> = ['onions', 'garlic', 'veggies', 'sauces', 'other'];

export function createDefaultState(locale: 'pt' | 'en' = 'pt'): AppState {
  const appliances = Object.fromEntries(
    APPLIANCE_KEYS.map((k) => [k, { checked: false, note: '' }])
  ) as AppState['appliances'];

  const week = Object.fromEntries(
    DAY_KEYS.map((k) => [k, { lunch: '', lunchSide: '', dinner: '', dinnerSide: '' }])
  ) as AppState['week'];

  const prepTasks = Object.fromEntries(
    PREP_KEYS.map((k) => [k, { forDishes: '', done: false }])
  ) as AppState['prepTasks'];

  return {
    appliances,
    dishes: Array.from({ length: 4 }, () => ({ name: '', protein: '', appliance: '', portions: '' })),
    recipeNotes: '',
    sides: Array.from({ length: 4 }, () => ({ dish: '', optionA: '', optionB: '', texture: '' })),
    carbsIdea:
      locale === 'pt'
        ? 'Arroz, macarrão, wraps, pães, batatas, cuscuz'
        : 'Rice, noodles, wraps, bread, potatoes, couscous',
    freshIdea:
      locale === 'pt'
        ? 'Salada, ervas, pepino, tomate, coleslaw, picles'
        : 'Salad, herbs, cucumber, tomato, slaw, pickles',
    crunchIdea:
      locale === 'pt'
        ? 'Castanhas, sementes, cebola crocante, farinha de rosca tostada, chilli crisp'
        : 'Nuts, seeds, crispy onions, toasted crumbs, chilli crisp',
    otherSides: '',
    week,
    flexNotes: '',
    ingredients: ['', '', '', ''],
    groceries: Array.from({ length: 12 }, () => ({ checked: false, text: '' })),
    cookingSteps: Array.from({ length: 4 }, () => ({
      dish: '', appliance: '', prep: '', cook: '', order: '', handsOff: false,
    })),
    prepTasks,
    cookingSequence: '',
    storage: Array.from({ length: 4 }, () => ({
      dish: '', portions: '', fridge: false, freezer: false, useFirst: false,
    })),
    reheatNotes: '',
    nextWeekNotes: '',
  };
}