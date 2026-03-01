/**
 * 数学工具类 / Math utilities
 */
export class MathUtils {
    /**
     * Get a random integer between min and max (inclusive)
     * 获取一个介于min和max之间的随机整数（包括min和max）
     * @param min The minimum value
     *
     */
    public static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get a random float between min and max (inclusive)
     * 获取一个介于min和max之间的随机浮点数（包括min和max）
     * @param min The minimum value
     *
     */
    public static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * 线性插值
     * @param start 起始值
     * @param end 结束值
     * @param t 插值
     * @returns 插值结果
     */
    public static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * t;
    }

    /**
     * 线性插值
     * @param start 起始值
     * @param end 结束值
     * @param t 插值
     * @returns 插值结果
     */
    public static lerpVector3(
        start: GameVector3,
        end: GameVector3,
        t: number
    ): GameVector3 {
        return new GameVector3(
            this.lerp(start.x, end.x, t),
            this.lerp(start.y, end.y, t),
            this.lerp(start.z, end.z, t)
        );
    }

    /**
     * 检查点是否在边界内 / Check if point is within bounds
     * @param point 点 / Point
     * @param min 最小边界 / Minimum bound
     * @param max 最大边界 / Maximum bound
     * @returns 是否在边界内 / Whether within bounds
     */
    public static isInBound(
        point: GameVector3,
        min: GameVector3,
        max: GameVector3
    ): boolean {
        return (
            point.x >= min.x &&
            point.x <= max.x &&
            point.y >= min.y &&
            point.y <= max.y &&
            point.z >= min.z &&
            point.z <= max.z
        );
    }

    /**
     * 获取数组中的随机元素 / Get a random element from an array
     * @param arr 数组 / Array
     * @returns 随机元素 / Random element
     */
    public static getRandomElement<T>(arr: T[]): T | null {
        if (arr.length === 0) {
            return null;
        }
        return arr[this.randomInt(0, arr.length - 1)];
    }

    /**
     * 根据权重随机选择元素 / Randomly select an element based on weights
     * @param weights 权重配置 / Weights configuration
     * @returns 选中的元素 / Selected element
     */
    public static weightedRandomSelect<T extends string>(weights: Record<T, number>): T {
        const keys = Object.keys(weights) as T[];
        const totalWeight = keys.reduce((sum, key) => sum + weights[key], 0);
        let random = Math.random() * totalWeight;
        
        for (const key of keys) {
            random -= weights[key];
            if (random <= 0) {
                return key;
            }
        }
        
        // 如果由于浮点数精度问题没有选中任何项，则返回第一个
        return keys[0];
    }
}