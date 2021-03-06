import { StatisticsCalculator } from "./statistics-calculator";
import { EquityCalculator } from "./equity-calculator";

export const enum PositionDirection {
    long = "long",
    short = "short"
}

export interface PositionDataForStats {
    id: string;
    direction?: PositionDirection;
    exitDate?: string;
    profit?: number;
    barsHeld?: number;
}

export interface RobotStatVals<T> {
    all?: T;
    long?: T;
    short?: T;
}

export type PerformanceVals = { x: number; y: number }[];

export interface RobotStats {
    lastUpdatedAt?: string;
    performance?: PerformanceVals;
    tradesCount?: RobotStatVals<number>;
    tradesWinning?: RobotStatVals<number>;
    tradesLosing?: RobotStatVals<number>;
    winRate?: RobotStatVals<number>;
    lossRate?: RobotStatVals<number>;
    avgBarsHeld?: RobotStatVals<number>;
    avgBarsHeldWinning?: RobotStatVals<number>;
    avgBarsHeldLosing?: RobotStatVals<number>;
    netProfit?: RobotStatVals<number>;
    localMax?: RobotStatVals<number>;
    avgNetProfit?: RobotStatVals<number>;
    grossProfit?: RobotStatVals<number>;
    avgProfit?: RobotStatVals<number>;
    grossLoss?: RobotStatVals<number>;
    avgLoss?: RobotStatVals<number>;
    maxConsecWins?: RobotStatVals<number>; // HERE WAS TYPO
    maxConsecLosses?: RobotStatVals<number>;
    currentWinSequence?: RobotStatVals<number>;
    currentLooseSequence?: RobotStatVals<number>;
    maxDrawdown?: RobotStatVals<number>;
    maxDrawdownDate?: RobotStatVals<string>;
    profitFactor?: RobotStatVals<number>;
    recoveryFactor?: RobotStatVals<number>;
    payoffRatio?: RobotStatVals<number>;
}

export interface RobotEquity {
    profit?: number;
    lastProfit?: number;
    tradesCount?: number;
    winRate?: number;
    maxDrawdown?: number;
    changes?: PerformanceVals;
}

export interface CommonStats {
    statistics: RobotStats;
    equity: RobotEquity;
}

export function calcStatisticsCumulatively(
    previousPositionsStatistics: CommonStats,
    newPosition: PositionDataForStats
): CommonStats {
    if (!newPosition) return previousPositionsStatistics;

    const prevStats = previousPositionsStatistics.statistics;

    const statistics = new StatisticsCalculator(prevStats, newPosition).calculateStatistics();
    const equity = new EquityCalculator(statistics, newPosition).calculateEquity();

    return { statistics, equity };
}
