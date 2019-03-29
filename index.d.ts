// Type definitions for iso-3166-1
// Project: https://github.com/lukealbao/iso-3166-1
// Definitions by: Bruno Finger <https://github.com/brunofin>

// usage: import * as iso3166 from 'iso-3166';

declare module "iso-3166" {
    export function numeric(input: string): string;
    export function alpha2(input: string): string;
    export function alpha3(input: string): string;
    export function name(input: string): string;
    export function currency(input: string): string;
}
