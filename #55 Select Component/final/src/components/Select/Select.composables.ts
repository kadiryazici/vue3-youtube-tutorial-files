import { ComputedRef, InjectionKey, inject, provide } from 'vue';

interface SelectContext {
   select: (value: string) => void;
   selectedOptions: ComputedRef<string[]>;
}

const key: InjectionKey<SelectContext> = Symbol('selectProviderKey');

export const provideSelectContext = (context: SelectContext) => provide(key, context);
export const useSelectContext = () => inject(key)!;
