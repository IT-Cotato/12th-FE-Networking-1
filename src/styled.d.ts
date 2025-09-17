/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/styled.d.ts
import "styled-components";
import { Theme } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
