import { Singleton } from '../../framework/common/Singleton';
import type { SceneType } from '../const/SceneConst';
import type { ISceneData } from '../data/SceneData';
import type { InteractableType } from '../const/TokenConst';
import type {
    IInteractableConfig,
    IInteractableData,
} from '../data/InteractableData';
import type { ContainerState, ContainerType } from '../const/ContainerConst';
import type {
    FoodType,
    IngredientState,
    IngredientType,
} from '../const/FoodConst';
import type { IMovablePropData } from '../data/MovablePropData';
import type { IContainerStateConfig } from '../data/ContainerData';
import type { IFoodStateConfig, IRecipeConfig } from '../data/FoodData';
import { SceneConfig } from '../config/SceneConfig';
import { InteractableConfig } from '../config/InteractableConfig';
import { MovablePropConfig } from '../config/MovablePropConfig';
import { ContainerConfig } from '../config/ContainerConfig';
import { FoodConfig } from '../config/FoodConfig';

/**
 * 配置管理器 / Config manager
 */
export class ConfigMgr extends Singleton<ConfigMgr>() {
    /**
     * 场景配置映射 / Scene configuration map
     */
    private _sceneConfigs: Map<SceneType, ISceneData> = new Map();
    /**
     * 可交互对象配置映射 / Interactable configuration map
     */
    private _interactableConfigs: Map<SceneType, IInteractableData[]> =
        new Map();
    /**
     * 可移动道具配置映射 / Movable prop configuration map
     */
    private _movablePropConfigs: Map<
        ContainerType | IngredientType | FoodType,
        IMovablePropData
    > = new Map();
    /**
     * 容器配置映射 / Container configuration map
     */
    private _containerConfigs: Map<
        ContainerType,
        Record<ContainerState, IContainerStateConfig>
    > = new Map();
    /**
     * 食材配置映射 / Ingredient configuration map
     */
    private _ingredientConfigs: Map<
        IngredientType,
        Map<IngredientState, IFoodStateConfig>
    > = new Map();
    /**
     * 食物配置映射 / Food configuration map
     */
    private _foodConfigs: Map<FoodType, IRecipeConfig[]> = new Map();

    /**
     * 加载所有配置 / Load all configurations
     */
    public load(): void {
        Object.values(SceneConfig.data).forEach((sceneData) => {
            this._sceneConfigs.set(sceneData.id as SceneType, sceneData);
        });

        Object.keys(InteractableConfig.data).forEach((key) => {
            const interactableData =
                InteractableConfig.data[
                    key as keyof typeof InteractableConfig.data
                ];
            this._interactableConfigs.set(key as SceneType, interactableData);
        });

        Object.keys(MovablePropConfig.data).forEach((key) => {
            const movablePropData =
                MovablePropConfig.data[
                    key as keyof typeof MovablePropConfig.data
                ];
            this._movablePropConfigs.set(
                key as ContainerType | IngredientType | FoodType,
                movablePropData
            );
        });

        Object.keys(ContainerConfig.data).forEach((key) => {
            const containerConfig =
                ContainerConfig.data[key as keyof typeof ContainerConfig.data];
            this._containerConfigs.set(key as ContainerType, containerConfig);
        });

        Object.keys(FoodConfig.ingredient).forEach((type) => {
            const ingredientConfig =
                FoodConfig.ingredient[
                    type as keyof typeof FoodConfig.ingredient
                ].states;
            this._ingredientConfigs.set(
                type as IngredientType,
                new Map(
                    Object.entries(ingredientConfig) as Array<
                        [IngredientState, IFoodStateConfig]
                    >
                )
            );
        });

        Object.keys(FoodConfig.food).forEach((type) => {
            const foodConfig =
                FoodConfig.food[type as keyof typeof FoodConfig.food].recipe;
            this._foodConfigs.set(type as FoodType, foodConfig);
        });
    }

    /**
     * 获取场景配置 / Get scene configuration
     * @param sceneId 场景ID / Scene ID
     * @returns 场景配置 / Scene configuration
     */
    public getSceneConfig(sceneId: SceneType): ISceneData | undefined {
        return this._sceneConfigs.get(sceneId);
    }

    /**
     * 获取可交互对象配置 / Get interactable configuration
     * @param sceneId 场景ID / Scene ID
     * @returns 可交互对象配置 / Interactable configuration
     */
    public getInteractableConfig(sceneId: SceneType): IInteractableData[] {
        return this._interactableConfigs.get(sceneId) || [];
    }

    /**
     * 获取可移动道具配置 / Get movable prop configuration
     * @param type 可移动道具类型 / Movable prop type
     * @returns 可移动道具配置 / Movable prop configuration
     */
    public getMovablePropConfig<
        T extends ContainerType | IngredientType | FoodType,
    >(
        type: T
    ):
        | IMovablePropData<
              T extends ContainerType
                  ? ContainerState
                  : T extends IngredientType
                    ? IngredientState
                    : ''
          >
        | undefined {
        return this._movablePropConfigs.get(type);
    }

    /**
     * 获取容器配置 / Get container configuration
     * @param type 容器类型 / Container type
     * @param state 容器状态 / Container state
     * @returns 容器配置 / Container configuration
     */
    public getContainerConfig(
        type: ContainerType,
        state: ContainerState
    ): IContainerStateConfig | undefined {
        return this._containerConfigs.get(type)?.[state];
    }

    /**
     * 获取食材配置 / Get ingredient configuration
     * @param type 食材类型 / Ingredient type
     * @param state 食材状态 / Ingredient state
     * @returns 食材配置 / Ingredient configuration
     */
    public getIngredientConfig(
        type: IngredientType,
        state: IngredientState
    ): IFoodStateConfig | undefined {
        return this._ingredientConfigs.get(type)?.get(state);
    }

    /**
     * 获取食物配置 / Get food configuration
     * @param type 食物类型 / Food type
     * @returns 食物配置 / Food configuration
     */
    public getFoodConfig(type: FoodType): IRecipeConfig[] | undefined {
        return this._foodConfigs.get(type);
    }
}
