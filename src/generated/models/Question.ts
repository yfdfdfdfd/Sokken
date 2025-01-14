/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime'
/**
 *
 * @export
 * @interface Question
 */
export interface Question {
  /**
   *
   * @type {number}
   * @memberof Question
   */
  id: number
  /**
   *
   * @type {string}
   * @memberof Question
   */
  questionText: string
  /**
   *
   * @type {string}
   * @memberof Question
   */
  correctAnswer: string
  /**
   *
   * @type {Array<string>}
   * @memberof Question
   */
  choices: Array<string>
  /**
   *
   * @type {string}
   * @memberof Question
   */
  commentary: string
  /**
   *
   * @type {string}
   * @memberof Question
   */
  tag?: string | null
}

/**
 * Check if a given object implements the Question interface.
 */
export function instanceOfQuestion(value: object): value is Question {
  if (!('id' in value) || value['id'] === undefined) return false
  if (!('questionText' in value) || value['questionText'] === undefined) return false
  if (!('correctAnswer' in value) || value['correctAnswer'] === undefined) return false
  if (!('choices' in value) || value['choices'] === undefined) return false
  if (!('commentary' in value) || value['commentary'] === undefined) return false
  return true
}

export function QuestionFromJSON(json: any): Question {
  return QuestionFromJSONTyped(json, false)
}

export function QuestionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Question {
  if (json == null) {
    return json
  }
  return {
    id: json['id'],
    questionText: json['question_text'],
    correctAnswer: json['correct_answer'],
    choices: json['choices'],
    commentary: json['commentary'],
    tag: json['tag'] == null ? undefined : json['tag']
  }
}

export function QuestionToJSON(json: any): Question {
  return QuestionToJSONTyped(json, false)
}

export function QuestionToJSONTyped(
  value?: Question | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value
  }

  return {
    id: value['id'],
    question_text: value['questionText'],
    correct_answer: value['correctAnswer'],
    choices: value['choices'],
    commentary: value['commentary'],
    tag: value['tag']
  }
}
