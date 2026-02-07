import type { ContainerType, ContainerState } from '../const/ContainerConst';
import type {
    IngredientType,
    IngredientState,
    FoodType,
} from '../const/FoodConst';

/**
 * 模型资源配置接口 / Mesh configuration interface
 */
export type IPropMeshConfig = {
    [K in ContainerType | IngredientType | FoodType]: Partial<
        Record<
            K extends ContainerType
                ? ContainerState
                : K extends IngredientType
                  ? IngredientState
                  : '',
            GameModelAssets
        >
    >;
};
