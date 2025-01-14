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
 * @interface QuestionCreateChild
 */
export interface QuestionCreateChild {
  /**
   *
   * @type {number}
   * @memberof QuestionCreateChild
   */
  questionId: number
  /**
   *
   * @type {boolean}
   * @memberof QuestionCreateChild
   */
  isCorrect: boolean | null
}

/**
 * Check if a given object implements the QuestionCreateChild interface.
 */
export function instanceOfQuestionCreateChild(value: object): value is QuestionCreateChild {
  if (!('questionId' in value) || value['questionId'] === undefined) return false
  if (!('commentary' in value) || value['commentary'] === undefined) return false
  if (!('isCorrect' in value) || value['isCorrect'] === undefined) return false
  return true
}

export function QuestionCreateChildFromJSON(json: any): QuestionCreateChild {
  return QuestionCreateChildFromJSONTyped(json, false)
}

export function QuestionCreateChildFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): QuestionCreateChild {
  if (json == null) {
    return json
  }
  return {
    questionId: json['question_id'],
    isCorrect: json['is_correct']
  }
}

export function QuestionCreateChildToJSON(json: any): QuestionCreateChild {
  return QuestionCreateChildToJSONTyped(json, false)
}

export function QuestionCreateChildToJSONTyped(
  value?: QuestionCreateChild | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value
  }

  return {
    question_id: value['questionId'],
    is_correct: value['isCorrect']
  }
}
