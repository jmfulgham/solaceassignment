import {defaults} from 'jest-config';
import type {Config} from 'jest';

const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],


  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },preset: "ts-jest",
};
export default config;
