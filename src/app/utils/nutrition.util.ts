import {
  CARBOHYDRATES_BACKGROUND_COLOR,
  CARBOHYDRATES_COLOR,
  CARBOHYDRATES_LABEL_EN, CARBOHYDRATES_LABEL_KO, FATS_BACKGROUND_COLOR,
  FATS_COLOR,
  FATS_LABEL_EN, FATS_LABEL_KO, PROTEINS_BACKGROUND_COLOR,
  PROTEINS_COLOR,
  PROTEINS_LABEL_EN, PROTEINS_LABEL_KO
} from '../constants/nutrition';

export interface NutritionProperties {
  carbohydrates: string;
  proteins: string;
  fats: string;
}

/**
 * return nutrition property keys in array
 */
export function getNutritionKeys(): (keyof NutritionProperties)[] {
  return [
    'carbohydrates',
    'proteins',
    'fats',
  ];
}

/**
 * return nutrition color set as object
 */
export function getNutritionColorSet(): NutritionProperties {
  return {
    carbohydrates: CARBOHYDRATES_COLOR,
    proteins: PROTEINS_COLOR,
    fats: FATS_COLOR,
  };
}

/**
 * return nutrition background color set as object
 */
export function getNutritionBackgroundColorSet(): NutritionProperties {
  return {
    carbohydrates: CARBOHYDRATES_BACKGROUND_COLOR,
    proteins: PROTEINS_BACKGROUND_COLOR,
    fats: FATS_BACKGROUND_COLOR,
  };
}

/**
 * return nutrition English label object
 */
export function getNutritionEnLabels(): NutritionProperties {
  return {
    carbohydrates: CARBOHYDRATES_LABEL_EN,
    proteins: PROTEINS_LABEL_EN,
    fats: FATS_LABEL_EN,
  };
}

/**
 * return nutrition Korean label object
 */
export function getNutritionKoLabels(): NutritionProperties {
  return {
    carbohydrates: CARBOHYDRATES_LABEL_KO,
    proteins: PROTEINS_LABEL_KO,
    fats: FATS_LABEL_KO,
  };
}
