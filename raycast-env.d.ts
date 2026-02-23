/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `track` command */
  export type Track = ExtensionPreferences & {}
  /** Preferences accessible in the `stop` command */
  export type Stop = ExtensionPreferences & {}
  /** Preferences accessible in the `status` command */
  export type Status = ExtensionPreferences & {}
  /** Preferences accessible in the `report` command */
  export type Report = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-entries` command */
  export type ManageEntries = ExtensionPreferences & {}
  /** Preferences accessible in the `summary` command */
  export type Summary = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `track` command */
  export type Track = {
  /** client 1 */
  "client": string
}
  /** Arguments passed to the `stop` command */
  export type Stop = {}
  /** Arguments passed to the `status` command */
  export type Status = {}
  /** Arguments passed to the `report` command */
  export type Report = {}
  /** Arguments passed to the `manage-entries` command */
  export type ManageEntries = {}
  /** Arguments passed to the `summary` command */
  export type Summary = {}
}

