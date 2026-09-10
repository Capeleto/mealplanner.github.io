export type Dictionary = {
  meta: { switchLabel: string; themeLight: string; themeDark: string };
  toolbar: {
    saved: string; cleared: string; print: string; clear: string; clearConfirm: string;
  };
  header: {
    title: string; subtitle: string; tagline: string; ideaTitle: string; ideaText: string;
    steps: { plan: string; planDesc: string; pick: string; pickDesc: string; cook: string; cookDesc: string };
  };
  appliances: {
    title: string; description: string; example: string; sectionTitle: string;
    columns: { appliance: string; use: string; notes: string };
    notePlaceholder: string; otherPlaceholder: string;
    labels: Record<string, string>;
    calloutTitle: string; calloutText: string;
  };
  dishes: {
    title: string; description: string; sectionTitle: string;
    columns: { dish: string; protein: string; appliance: string; portions: string };
    placeholders: { name: string; protein: string; appliance: string; portions: string };
    tip: string; notesTitle: string; notesPlaceholder: string;
  };
  sides: {
    title: string; description: string; example: string; sectionTitle: string;
    columns: { base: string; optionA: string; optionB: string; texture: string };
    placeholders: { dish: string; optionA: string; optionB: string; texture: string };
    tip: string; ideasTitle: string;
    ideaColumns: { carbs: string; fresh: string; crunch: string };
    otherTitle: string; otherPlaceholder: string;
  };
  week: {
    title: string; description: string;
    columns: { day: string; lunch: string; lunchSide: string; dinner: string; dinnerSide: string };
    placeholders: { lunch: string; side: string; dinner: string };
    days: Record<string, string>;
    flexTitle: string; flexText: string; flexPlaceholder: string;
  };
  ingredients: {
    title: string; description: string; boxTitle: string; dishLabel: string;
    placeholder: string; tip: string;
  };
  groceries: { title: string; description: string; itemPlaceholder: string };
  cooking: {
    title: string; description: string;
    columns: { dish: string; appliance: string; prep: string; cook: string; order: string; handsOff: string };
    placeholders: { dish: string; appliance: string; prep: string; cook: string; order: string };
    tip: string; prepTitle: string;
    prepColumns: { task: string; forDishes: string; once: string };
    prepLabels: Record<string, string>;
    prepPlaceholder: string; sequenceTitle: string; sequencePlaceholder: string;
  };
  storage: {
    title: string; description: string; fridgeChecked: string; containersReady: string;
    sectionTitle: string;
    columns: { dish: string; portions: string; fridge: string; freezer: string; useFirst: string };
    reheatTitle: string; reheatPlaceholder: string;
    finalTitle: string; finalText: string;
    nextWeekTitle: string; nextWeekPlaceholder: string;
    dishLabel: string;
  };
}