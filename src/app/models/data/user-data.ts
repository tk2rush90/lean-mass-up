import {randomKey} from '../../utils/random.util';

export interface IUserData {
  // unique user id
  id?: string;
  // weight
  weight: number;
  // protein ratio
  proteinRatio: number;
  // required calories for muscle growth
  muscleGrowthCalories: number;
  // required carbohydrates
  requiredCarbohydrates: number;
  // required protein
  requiredProteins: number;
  // required fats
  requiredFats: number;
}

export class UserData implements IUserData{
  // unique user id
  id: string;
  // weight
  weight: number;
  // protein ratio
  proteinRatio: number;
  // required calories
  muscleGrowthCalories: number;
  // required carbohydrates
  requiredCarbohydrates: number;
  // required protein
  requiredProteins: number;
  // required fats
  requiredFats: number;

  constructor(data?: IUserData) {
    this.id = data?.id || randomKey();
    this.weight = data?.weight;
    this.proteinRatio = data?.proteinRatio;
    this.muscleGrowthCalories = data?.muscleGrowthCalories;
    this.requiredCarbohydrates = data?.requiredCarbohydrates;
    this.requiredProteins = data?.requiredProteins;
    this.requiredFats = data?.requiredFats;
  }
}
