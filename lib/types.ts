export type ApplianceKey =
  | 'stovePan' | 'stovePot' | 'oven' | 'slowCooker' | 'airFryer'
  | 'riceCooker' | 'instantPot' | 'steamer' | 'other';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type PrepKey = 'onions' | 'garlic' | 'veggies' | 'sauces' | 'other';

export type ApplianceState = { checked: boolean; note: string }
export type Dish = { name: string; protein: string; appliance: string; portions: string }
export type Side = { dish: string; optionA: string; optionB: string; texture: string }
export type DayPlan = { lunch: string; lunchSide: string; dinner: string; dinnerSide: string }
export type GroceryItem = { checked: boolean; text: string }
export type CookingStep = {
  dish: string; appliance: string; prep: string; cook: string; order: string; handsOff: boolean;
}
export type PrepTask = { forDishes: string; done: boolean }
export type StorageItem = {
  dish: string; portions: string; fridge: boolean; freezer: boolean; useFirst: boolean;
}

export type AppState = {
  appliances: Record<ApplianceKey, ApplianceState>;
  dishes: Array<Dish>;
  recipeNotes: string;
  sides: Array<Side>;
  carbsIdea: string; freshIdea: string; crunchIdea: string;
  otherSides: string;
  week: Record<DayKey, DayPlan>;
  flexNotes: string;
  ingredients: Array<string>;
  groceries: Array<GroceryItem>;
  cookingSteps: Array<CookingStep>;
  prepTasks: Record<PrepKey, PrepTask>;
  cookingSequence: string;
  storage: Array<StorageItem>;
  reheatNotes: string;
  nextWeekNotes: string;
}