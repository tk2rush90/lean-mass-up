import {DbConfig} from '../models/db/db-config';

export const INDEXED_DB_CONFIG: DbConfig = {
  name: 'LeanMassUp',
  version: 1,
  storeConfigs: [
    /**
     * user data table
     * user will be only one
     */
    {
      name: 'User',
      options: {keyPath: 'id', autoIncrement: false},
      columns: [
        {name: 'weight', keyPath: 'weight', unique: false},
        {name: 'proteinRatio', keyPath: 'proteinRatio', unique: false},
        {name: 'muscleGrowthCalories', keyPath: 'muscleGrowthCalories', unique: false},
        {name: 'requiredCarbohydrates', keyPath: 'requiredCarbohydrates', unique: false},
        {name: 'requiredProteins', keyPath: 'requiredProteins', unique: false},
        {name: 'requiredFats', keyPath: 'requiredFats', unique: false},
      ]
    },
    /**
     * nutrition record data
     * new record will be created everyday
     */
    {
      name: 'NutritionRecords',
      options: {keyPath: 'id', autoIncrement: false},
      columns: [
        {name: 'userId, date', keyPath: ['userId', 'date'], unique: true},
        {name: 'weight', keyPath: 'weight', unique: false},
        {name: 'requiredCarbohydrates', keyPath: 'requiredCarbohydrates', unique: false},
        {name: 'requiredProteins', keyPath: 'requiredProteins', unique: false},
        {name: 'requiredFats', keyPath: 'requiredFats', unique: false},
      ]
    },
    /**
     * food records will be created by user input for each nutrition record
     */
    {
      name: 'FoodRecords',
      options: {keyPath: 'id', autoIncrement: false},
      columns: [
        {name: 'nutritionRecordId', keyPath: 'nutritionRecordId', unique: false},
        {name: 'foodId, date', keyPath: ['foodId', 'date'], unique: true},
        {name: 'quantity', keyPath: 'quantity', unique: false},
        {name: 'createdOn', keyPath: 'createdOn', unique: false},
      ]
    },
    /**
     * foods data will be created to manage food list
     */
    {
      name: 'Foods',
      options: {keyPath: 'id', autoIncrement: false},
      columns: [
        {name: 'userId', keyPath: 'userId', unique: false},
        {name: 'name', keyPath: 'name', unique: false},
        {name: 'carbohydrates', keyPath: 'carbohydrates', unique: false},
        {name: 'proteins', keyPath: 'proteins', unique: false},
        {name: 'fats', keyPath: 'fats', unique: false},
        {name: 'createdOn', keyPath: 'createdOn', unique: false},
      ]
    },
    /**
     * archived foods will be used to map with food record
     */
    {
      name: 'ArchivedFoods',
      options: {keyPath: 'id', autoIncrement: false},
      columns: [
        {name: 'userId', keyPath: 'userId', unique: false},
        {name: 'name', keyPath: 'name', unique: false},
        {name: 'carbohydrates', keyPath: 'carbohydrates', unique: false},
        {name: 'proteins', keyPath: 'proteins', unique: false},
        {name: 'fats', keyPath: 'fats', unique: false},
        {name: 'createdOn', keyPath: 'createdOn', unique: false},
      ]
    }
  ]
};





