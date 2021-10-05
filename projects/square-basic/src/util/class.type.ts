/**
 * Equivalent de java.lang.Class<T>
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export type Class<T> = { new(): T };