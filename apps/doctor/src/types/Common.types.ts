// Common types shared across the Doctor app

/**
 * CSS Module classes type - allows passing styles to shared components
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Generic handler types
 */
export type VoidHandler = () => void;
export type IdHandler = (id: string) => void;
export type StringHandler = (value: string) => void;
