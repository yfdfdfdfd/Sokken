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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserCreate
 */
export interface UserCreate {
    /**
     * 
     * @type {string}
     * @memberof UserCreate
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreate
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreate
     */
    password: string;
}

/**
 * Check if a given object implements the UserCreate interface.
 */
export function instanceOfUserCreate(value: object): value is UserCreate {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    return true;
}

export function UserCreateFromJSON(json: any): UserCreate {
    return UserCreateFromJSONTyped(json, false);
}

export function UserCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserCreate {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'password': json['password'],
    };
}

  export function UserCreateToJSON(json: any): UserCreate {
      return UserCreateToJSONTyped(json, false);
  }

  export function UserCreateToJSONTyped(value?: UserCreate | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'email': value['email'],
        'password': value['password'],
    };
}
